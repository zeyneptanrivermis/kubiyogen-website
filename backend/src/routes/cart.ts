import { Router } from 'express';
import { z } from 'zod';
import { ItemType } from '@prisma/client';
import { authenticate, type AuthenticatedRequest } from '../lib/auth';
import { prisma } from '../lib/db';
import { asyncHandler, HttpError, parseBody } from '../utils/http';
import { resolveCatalogItem } from '../utils/items';

export const cartRouter = Router();
cartRouter.use(authenticate);

const cartItemSchema = z.object({
  itemType: z.nativeEnum(ItemType),
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).max(99).default(1),
});

cartRouter.get('/', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: 'desc' },
  });
  const enriched = await Promise.all(
    items.map(async (item) => ({
      ...item,
      catalogItem: await resolveCatalogItem(prisma, item.itemType, item.itemId),
    })),
  );
  res.json({ items: enriched });
}));

cartRouter.post('/', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(cartItemSchema, req.body);
  const item = await resolveCatalogItem(prisma, body.itemType, body.itemId);
  if (item.stock !== undefined && item.stock < body.quantity) {
    throw new HttpError(409, 'Not enough stock');
  }

  const cartItem = await prisma.cartItem.upsert({
    where: {
      userId_itemType_itemId: {
        userId: req.user!.id,
        itemType: body.itemType,
        itemId: body.itemId,
      },
    },
    create: { userId: req.user!.id, ...body },
    update: { quantity: { increment: body.quantity } },
  });

  res.status(201).json(cartItem);
}));

cartRouter.patch('/:id', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(z.object({ quantity: z.number().int().min(1).max(99) }), req.body);
  const cartItem = await prisma.cartItem.findFirst({
    where: { id: String(req.params.id), userId: req.user!.id },
  });
  if (!cartItem) throw new HttpError(404, 'Cart item not found');
  const updated = await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity: body.quantity },
  });
  res.json(updated);
}));

cartRouter.delete('/:id', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: { id: String(req.params.id), userId: req.user!.id },
  });
  if (!cartItem) throw new HttpError(404, 'Cart item not found');
  await prisma.cartItem.delete({ where: { id: cartItem.id } });
  res.status(204).send();
}));
