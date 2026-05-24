import { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodObject, type ZodRawShape } from 'zod';

export const validate = (schema: ZodObject<ZodRawShape>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validasyon hatası',
          errors: error.issues.map((e) => ({
            path: e.path[1],
            message: e.message,
          })),
        });
      }
      return next(error);
    }
  };
};
