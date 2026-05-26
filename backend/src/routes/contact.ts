import { Router } from 'express';
import { z } from 'zod';
import { sendMail } from '../lib/email';
import { asyncHandler, parseBody } from '../utils/http';

export const contactRouter = Router();

contactRouter.post('/', asyncHandler(async (req, res) => {
  const body = parseBody(
    z.object({
      name: z.string().min(2).max(80),
      email: z.string().email(),
      message: z.string().min(10).max(5000),
    }),
    req.body,
  );

  await sendMail({
    to: process.env.CONTACT_TO ?? process.env.MAIL_FROM ?? body.email,
    subject: `Kubiyogen iletisim: ${body.name}`,
    text: `${body.name} <${body.email}>\n\n${body.message}`,
  });

  res.status(202).json({ message: 'Contact request received' });
}));
