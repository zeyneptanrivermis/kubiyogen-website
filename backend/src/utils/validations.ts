import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Geçersiz e-posta adresi'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
    name: z.string().min(2, 'İsim en az 2 karakter olmalıdır').optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Geçersiz e-posta adresi'),
    password: z.string().min(1, 'Şifre gereklidir'),
  }),
});
