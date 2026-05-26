import { Router } from 'express';
import { z } from 'zod';
import { OrderStatus } from '@prisma/client';
import { authenticate, type AuthenticatedRequest } from '../lib/auth';
import { prisma } from '../lib/db';
import { createPaytrToken, verifyPaytrCallback } from '../lib/paytr';
import { createAccessCodeValue, defaultAccessCodeExpiry } from '../lib/accessCode';
import { asyncHandler, HttpError, parseBody } from '../utils/http';

export const paymentRouter = Router();

paymentRouter.post('/paytr/token', authenticate, asyncHandler(async (req: AuthenticatedRequest, res) => {
  const body = parseBody(
    z.object({
      orderId: z.string(),
      successUrl: z.string().url(),
      failUrl: z.string().url(),
    }),
    req.body,
  );
  const order = await prisma.order.findFirst({
    where: { id: body.orderId, userId: req.user!.id },
    include: { user: true, items: { include: { course: true, event: true, product: true } } },
  });
  if (!order) throw new HttpError(404, 'Order not found');

  const basket = order.items.map((item) => [
    item.course?.title ?? item.event?.title ?? item.product?.name ?? item.itemType,
    String(item.unitPrice),
    item.quantity,
  ] as [string, string, number]);

  res.json({
    tokenPayload: createPaytrToken({
      merchantOid: order.id,
      email: order.user.email,
      amount: order.totalAmount,
      userIp: req.ip ?? '127.0.0.1',
      basket,
      successUrl: body.successUrl,
      failUrl: body.failUrl,
    }),
  });
}));

paymentRouter.post('/paytr/webhook', asyncHandler(async (req, res) => {
  if (!verifyPaytrCallback(req.body)) {
    throw new HttpError(400, 'Invalid PayTR signature');
  }

  const merchantOid = String(req.body.merchant_oid ?? '');
  const status = String(req.body.status ?? '');
  const order = await prisma.order.findUnique({
    where: { id: merchantOid },
    include: { items: true },
  });
  if (!order) throw new HttpError(404, 'Order not found');

  await prisma.$transaction(async (tx) => {
    const newStatus = status === 'success' ? OrderStatus.PAID : OrderStatus.FAILED;
    await tx.order.update({
      where: { id: order.id },
      data: { status: newStatus, paymentRef: String(req.body.payment_id ?? '') },
    });

    if (newStatus === OrderStatus.PAID) {
      const existing = await tx.accessCode.count({ where: { orderId: order.id } });
      if (existing === 0) {
        for (const item of order.items.filter((entry) => entry.courseId || entry.eventId)) {
          await tx.accessCode.create({
            data: {
              code: createAccessCodeValue(),
              userId: order.userId,
              orderId: order.id,
              courseId: item.courseId,
              eventId: item.eventId,
              expiresAt: defaultAccessCodeExpiry(),
            },
          });
        }
      }
    }
  });

  res.type('text/plain').send('OK');
}));
