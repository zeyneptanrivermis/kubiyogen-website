import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { Role } from '@prisma/client';
import { prisma } from './db';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => bcrypt.compare(password, hash);

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

export type AuthenticatedRequest = Request & {
  user?: AuthUser;
};

const jwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is required');
  return secret;
};

export const signToken = (user: AuthUser) => jwt.sign(user, jwtSecret(), { expiresIn: '7d' });

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    const payload = jwt.verify(token, jwtSecret()) as AuthUser;
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, role: true },
    });
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') return res.status(403).json({ message: 'Admin access required' });
  return next();
};
