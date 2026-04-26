import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

// Express Request tipini genişleterek .user özelliğini tanıtalım
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { items, totalAmount } = req.body;
    res.status(201).json({ message: 'Sipariş oluşturma henüz aktif değil.' });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Yetkisiz erişim.' });
    }

    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      include: { items: true },
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
