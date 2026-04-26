import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

/**
 * @openapi
 * /api/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Tüm etkinlikleri getir
 *     responses:
 *       200:
 *         description: Başarılı
 */
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.event.findMany({
      include: { instructor: true, images: true },
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /api/events/upcoming:
 *   get:
 *     tags:
 *       - Events
 *     summary: Yaklaşan etkinlikleri getir (Gelecek tarihliler)
 *     responses:
 *       200:
 *         description: Başarılı
 */
export const getUpcoming = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.event.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      take: 3,
      include: { instructor: true, images: true },
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /api/events/recent:
 *   get:
 *     tags:
 *       - Events
 *     summary: Geçmiş etkinlikleri getir
 *     responses:
 *       200:
 *         description: Başarılı
 */
export const getRecent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.event.findMany({
      where: { date: { lt: new Date() } },
      orderBy: { date: 'desc' },
      take: 3,
      include: { instructor: true, images: true },
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /api/events/{slug}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Slug ile etkinlik detayı getir
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Başarılı
 *       404:
 *         description: Etkinlik bulunamadı
 */
export const getBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const event = await prisma.event.findUnique({
      where: { slug: String(slug) },
      include: { instructor: true, images: true, reviews: true },
    });
    if (!event) return res.status(404).json({ message: 'Etkinlik bulunamadı.' });
    res.json(event);
  } catch (error) {
    next(error);
  }
};
