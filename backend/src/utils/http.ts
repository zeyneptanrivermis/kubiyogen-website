import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodSchema } from 'zod';

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export const asyncHandler =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };

export const parseBody = <T>(schema: ZodSchema<T>, data: unknown) => schema.parse(data);

export const parseQuery = <T>(schema: ZodSchema<T>, data: unknown) => schema.parse(data);

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      issues: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }

  const message = error instanceof Error ? error.message : '';
  if (message.includes("Can't reach database server")) {
    return res.status(503).json({
      message: 'Veritabani baglantisi kurulamadı. Lutfen PostgreSQL/Docker servisinin calistigindan emin olun.',
    });
  }

  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
};

export const paginationSchema = {
  limit: (value: unknown) => Math.min(Number(value ?? 20), 100),
  offset: (value: unknown) => Math.max(Number(value ?? 0), 0),
};
