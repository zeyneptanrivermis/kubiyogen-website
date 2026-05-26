import { randomUUID } from 'crypto';
import { Router } from 'express';
import { z } from 'zod';
import { comparePassword, hashPassword, signToken, authenticate, type AuthenticatedRequest } from '../lib/auth';
import { prisma } from '../lib/db';
import { sendMail } from '../lib/email';
import { asyncHandler, HttpError, parseBody } from '../utils/http';

export const authRouter = Router();

const credentialsSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8),
});

authRouter.post(
  '/register',
  asyncHandler(async (req, res) => {
    const body = parseBody(
      credentialsSchema.extend({
        name: z.string().min(2).optional(),
        phone: z.string().min(10).optional(),
      }),
      req.body,
    );
    const exists = await prisma.user.findUnique({ where: { email: body.email } });
    if (exists) throw new HttpError(409, 'Email already registered');

    const user = await prisma.user.create({
      data: {
        ...(body.name ? { name: body.name } : {}),
        ...(body.phone ? { phone: body.phone } : {}),
        email: body.email,
        password: await hashPassword(body.password),
      },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    await sendMail({
      to: user.email,
      subject: 'Kubiyogen hesabiniz olusturuldu',
      text: `Merhaba ${user.name ?? user.email}, Kubiyogen hesabiniz hazir.`,
    });

    res.status(201).json({ user, token: signToken(user) });
  }),
);

authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const body = parseBody(credentialsSchema, req.body);
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user || !(await comparePassword(body.password, user.password))) {
      throw new HttpError(401, 'Invalid email or password');
    }

    const safeUser = { id: user.id, email: user.email, role: user.role };
    res.json({ user: safeUser, token: signToken(safeUser) });
  }),
);

authRouter.get(
  '/me',
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
    });
    res.json(user);
  }),
);

authRouter.post(
  '/password-reset/request',
  asyncHandler(async (req, res) => {
    const { email } = parseBody(z.object({ email: z.string().email().transform((v) => v.toLowerCase()) }), req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = randomUUID();
      const expiresAt = new Date(Date.now() + 1000 * 60 * 30);
      await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt } });
      await sendMail({
        to: email,
        subject: 'Kubiyogen sifre sifirlama',
        text: `Sifre sifirlama tokeniniz: ${token}`,
      });
    }

    res.json({ message: 'If the email exists, a reset token was sent' });
  }),
);

authRouter.post(
  '/password-reset/confirm',
  asyncHandler(async (req, res) => {
    const body = parseBody(
      z.object({ token: z.string().min(10), password: z.string().min(8) }),
      req.body,
    );
    const reset = await prisma.passwordResetToken.findUnique({ where: { token: body.token } });
    if (!reset || reset.usedAt || reset.expiresAt < new Date()) {
      throw new HttpError(400, 'Invalid or expired reset token');
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: reset.userId },
        data: { password: await hashPassword(body.password) },
      }),
      prisma.passwordResetToken.update({
        where: { id: reset.id },
        data: { usedAt: new Date() },
      }),
    ]);

    res.json({ message: 'Password updated' });
  }),
);
