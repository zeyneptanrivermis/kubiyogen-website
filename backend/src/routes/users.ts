import { Router } from 'express';
import { z } from 'zod';
import { authenticate, type AuthenticatedRequest } from '../lib/auth';
import { prisma } from '../lib/db';
import { asyncHandler, parseBody } from '../utils/http';

export const usersRouter = Router();
usersRouter.use(authenticate);

usersRouter.get('/profile', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const profile = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
  res.json(profile);
}));

usersRouter.patch('/profile', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(
    z.object({
      name: z.string().min(2).max(80).optional(),
      phone: z.string().min(10).max(15).optional(),
    }),
    req.body,
  );
  const data: { name?: string; phone?: string } = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.phone !== undefined) data.phone = body.phone;

  const profile = await prisma.user.update({
    where: { id: req.user!.id },
    data,
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
  res.json(profile);
}));

usersRouter.get('/orders', asyncHandler(async (req: AuthenticatedRequest, res) => {
  res.json(await prisma.order.findMany({
    where: { userId: req.user!.id },
    include: { items: true, accessCodes: true },
    orderBy: { createdAt: 'desc' },
  }));
}));

usersRouter.get('/courses', asyncHandler(async (req: AuthenticatedRequest, res) => {
  const codes = await prisma.accessCode.findMany({
    where: { userId: req.user!.id, courseId: { not: null }, expiresAt: { gt: new Date() } },
    include: { course: true },
  });
  res.json(codes.map((code) => ({ accessCode: code.code, expiresAt: code.expiresAt, course: code.course })));
}));

usersRouter.delete('/account', asyncHandler(async (req: AuthenticatedRequest, res) => {
  await prisma.user.delete({ where: { id: req.user!.id } });
  res.status(204).send();
}));
