import { Router } from 'express';
import { z } from 'zod';
import { authenticate, type AuthenticatedRequest } from '../lib/auth';
import { createAccessCodeValue, defaultAccessCodeExpiry } from '../lib/accessCode';
import { prisma } from '../lib/db';
import { asyncHandler, HttpError, parseBody } from '../utils/http';

export const accessCodesRouter = Router();

accessCodesRouter.post('/validate', asyncHandler(async (req, res) => {
  const { code } = parseBody(z.object({ code: z.string().min(8) }), req.body);
  const accessCode = await prisma.accessCode.findUnique({ where: { code } });
  if (
    !accessCode ||
    accessCode.expiresAt < new Date() ||
    accessCode.revokedAt ||
    accessCode.useCount >= accessCode.maxUses
  ) {
    throw new HttpError(403, 'Access code is invalid or expired');
  }

  const updated = await prisma.$transaction(async (tx) => {
    const next = await tx.accessCode.update({
      where: { id: accessCode.id },
      data: {
        usedAt: accessCode.usedAt ?? new Date(),
        useCount: { increment: 1 },
      },
    });
    await tx.accessCodeLog.create({
      data: {
        accessCodeId: accessCode.id,
        userId: accessCode.userId,
        ipAddress: req.ip ?? null,
        userAgent: req.headers['user-agent'] ?? null,
      },
    });
    return next;
  });
  res.json({ valid: true, accessCode: updated });
}));

accessCodesRouter.post('/generate', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(
    z.object({
      orderId: z.string().optional(),
      courseId: z.string().optional(),
      eventId: z.string().optional(),
      expiresAt: z.coerce.date().optional(),
      maxUses: z.number().int().min(1).max(100).default(1),
    }),
    req.body,
  );

  if (!body.courseId && !body.eventId) {
    throw new HttpError(400, 'courseId or eventId is required');
  }

  const accessCode = await prisma.accessCode.create({
    data: {
      code: createAccessCodeValue(),
      userId: req.user!.id,
      orderId: body.orderId ?? null,
      courseId: body.courseId ?? null,
      eventId: body.eventId ?? null,
      expiresAt: body.expiresAt ?? defaultAccessCodeExpiry(),
      maxUses: body.maxUses,
    },
  });

  res.status(201).json(accessCode);
}));
