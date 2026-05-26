import { Router } from 'express';
import { z } from 'zod';
import { OrderStatus } from '@prisma/client';
import { authenticate, requireAdmin } from '../lib/auth';
import { createAccessCodeValue, defaultAccessCodeExpiry } from '../lib/accessCode';
import { prisma } from '../lib/db';
import { asyncHandler, HttpError, parseBody, parseQuery } from '../utils/http';

export const adminRouter = Router();
adminRouter.use(authenticate, requireAdmin);

const eventSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(5),
  date: z.coerce.date(),
  location: z.string().min(2),
  price: z.number().nonnegative(),
  isUpcoming: z.boolean().default(true),
});

const courseSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(5),
  price: z.number().nonnegative(),
  category: z.string().min(2),
  language: z.string().min(2).max(5),
});

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(5),
  price: z.number().nonnegative(),
  stock: z.number().int().min(0).default(0),
});

const crud = <T extends z.ZodRawShape>(
  path: string,
  schema: z.ZodObject<T>,
  model: any,
) => {
  adminRouter.post(path, asyncHandler(async (req, res) => {
    res.status(201).json(await model.create({ data: parseBody(schema, req.body) }));
  }));

  adminRouter.put(`${path}/:id`, asyncHandler(async (req, res) => {
    res.json(await model.update({ where: { id: String(req.params.id) }, data: parseBody(schema.partial(), req.body) }));
  }));

  adminRouter.delete(`${path}/:id`, asyncHandler(async (req, res) => {
    await model.delete({ where: { id: String(req.params.id) } });
    res.status(204).send();
  }));
};

crud('/events', eventSchema, prisma.event);
crud('/courses', courseSchema, prisma.course);
crud('/products', productSchema, prisma.product);

adminRouter.get('/orders', asyncHandler(async (req, res) => {
  const query = parseQuery(
    z.object({
      status: z.nativeEnum(OrderStatus).optional(),
      limit: z.coerce.number().int().min(1).max(100).default(50),
      offset: z.coerce.number().int().min(0).default(0),
    }),
    req.query,
  );
  res.json(await prisma.order.findMany({
    where: query.status ? { status: query.status } : {},
    include: { user: { select: { id: true, email: true, name: true } }, items: true },
    take: query.limit,
    skip: query.offset,
    orderBy: { createdAt: 'desc' },
  }));
}));

adminRouter.patch('/orders/:id', asyncHandler(async (req, res) => {
  const body = parseBody(z.object({ status: z.nativeEnum(OrderStatus) }), req.body);
  const order = await prisma.order.findUnique({ where: { id: String(req.params.id) } });
  if (!order) throw new HttpError(404, 'Order not found');
  res.json(await prisma.order.update({ where: { id: order.id }, data: body }));
}));

adminRouter.get('/users', asyncHandler(async (req, res) => {
  const query = parseQuery(
    z.object({
      search: z.string().optional(),
      limit: z.coerce.number().int().min(1).max(100).default(50),
      offset: z.coerce.number().int().min(0).default(0),
    }),
    req.query,
  );
  const args = {
    ...(query.search
      ? { where: { OR: [{ email: { contains: query.search, mode: 'insensitive' as const } }, { name: { contains: query.search, mode: 'insensitive' as const } }] } }
      : {}),
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    take: query.limit,
    skip: query.offset,
    orderBy: { createdAt: 'desc' as const },
  };
  res.json(await prisma.user.findMany(args));
}));

adminRouter.post('/access-codes/generate', asyncHandler(async (req, res) => {
  const body = parseBody(
    z.object({
      userId: z.string().optional(),
      orderId: z.string().optional(),
      courseId: z.string().optional(),
      eventId: z.string().optional(),
      count: z.number().int().min(1).max(100).default(1),
      expiresAt: z.coerce.date().optional(),
      maxUses: z.number().int().min(1).max(100).default(1),
    }),
    req.body,
  );

  const data = Array.from({ length: body.count }, () => ({
    code: createAccessCodeValue(),
    userId: body.userId ?? null,
    orderId: body.orderId ?? null,
    courseId: body.courseId ?? null,
    eventId: body.eventId ?? null,
    expiresAt: body.expiresAt ?? defaultAccessCodeExpiry(),
    maxUses: body.maxUses,
  }));

  await prisma.accessCode.createMany({ data });
  res.status(201).json({ items: data });
}));

adminRouter.get('/access-codes', asyncHandler(async (_req, res) => {
  res.json(await prisma.accessCode.findMany({
    include: {
      user: { select: { id: true, email: true, name: true } },
      course: { select: { id: true, title: true } },
      event: { select: { id: true, title: true } },
      order: { select: { id: true, status: true } },
    },
    orderBy: { createdAt: 'desc' },
  }));
}));

adminRouter.patch('/access-codes/:id/revoke', asyncHandler(async (req, res) => {
  const accessCode = await prisma.accessCode.findUnique({ where: { id: String(req.params.id) } });
  if (!accessCode) throw new HttpError(404, 'Access code not found');
  res.json(await prisma.accessCode.update({
    where: { id: accessCode.id },
    data: { revokedAt: new Date() },
  }));
}));

adminRouter.get('/access-codes/:id/logs', asyncHandler(async (req, res) => {
  const accessCode = await prisma.accessCode.findUnique({ where: { id: String(req.params.id) } });
  if (!accessCode) throw new HttpError(404, 'Access code not found');
  res.json(await prisma.accessCodeLog.findMany({
    where: { accessCodeId: accessCode.id },
    orderBy: { createdAt: 'desc' },
  }));
}));

adminRouter.get('/visual-credits', asyncHandler(async (_req, res) => {
  res.json(await prisma.visualCredit.findMany({
    include: { user: { select: { id: true, email: true, name: true } } },
    orderBy: { updatedAt: 'desc' },
  }));
}));

adminRouter.get('/visual-projects', asyncHandler(async (_req, res) => {
  res.json(await prisma.visualProject.findMany({
    include: { user: { select: { id: true, email: true, name: true } } },
    orderBy: { updatedAt: 'desc' },
  }));
}));
