import { Router } from 'express';
import { z } from 'zod';
import { ItemType, OrderStatus } from '@prisma/client';
import { authenticate, type AuthenticatedRequest } from '../lib/auth';
import { prisma } from '../lib/db';
import { asyncHandler, HttpError, parseBody } from '../utils/http';
import { orderItemRelation, resolveCatalogItem } from '../utils/items';

export const ordersRouter = Router();
ordersRouter.use(authenticate);

const orderSchema = z.object({
  items: z
    .array(
      z.object({
        itemType: z.nativeEnum(ItemType),
        itemId: z.string().min(1),
        quantity: z.number().int().min(1).max(99).default(1),
      }),
    )
    .min(1),
});

ordersRouter.post('/', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(orderSchema, req.body);
  const resolved = await Promise.all(
    body.items.map(async (item) => ({
      ...item,
      catalogItem: await resolveCatalogItem(prisma, item.itemType, item.itemId),
    })),
  );

  for (const item of resolved) {
    if (item.catalogItem.stock !== undefined && item.catalogItem.stock < item.quantity) {
      throw new HttpError(409, `${item.catalogItem.title} stock is not enough`);
    }
  }

  const order = await prisma.$transaction(async (tx) => {
    for (const item of resolved.filter((entry) => entry.itemType === 'PRODUCT')) {
      await tx.product.update({
        where: { id: item.itemId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Clear the user's cart items
    await tx.cartItem.deleteMany({
      where: { userId: req.user!.id },
    });

    return tx.order.create({
      data: {
        userId: req.user!.id,
        totalAmount: resolved.reduce((sum, item) => sum + item.catalogItem.price * item.quantity, 0),
        items: {
          create: resolved.map((item) => ({
            itemType: item.itemType,
            quantity: item.quantity,
            unitPrice: item.catalogItem.price,
            ...orderItemRelation(item.itemType, item.itemId),
          })),
        },
      },
      include: { items: true },
    });
  });

  res.status(201).json(order);
}));

ordersRouter.get('/', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.id },
    include: { items: true, accessCodes: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(orders);
}));

ordersRouter.patch('/:id/status', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(z.object({ status: z.nativeEnum(OrderStatus) }), req.body);
  const order = await prisma.order.findFirst({ where: { id: String(req.params.id), userId: req.user!.id } });
  if (!order) throw new HttpError(404, 'Order not found');
  const updated = await prisma.order.update({ where: { id: order.id }, data: { status: body.status } });
  res.json(updated);
}));
