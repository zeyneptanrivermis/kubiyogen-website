import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

/**
 * @openapi
 * /api/courses:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Tüm kursları getir (Filtreleme ve Sayfalama ile)
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, newest]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Başarılı
 * 
 * /api/courses/{slug}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Slug ile kurs detayı getir
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
 *         description: Kurs bulunamadı
 */
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, sort, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (category) where.category = String(category);

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        orderBy,
        skip,
        take: Number(limit),
        include: { instructor: true, images: true },
      }),
      prisma.course.count({ where }),
    ]);

    res.json({
      data: courses,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const course = await prisma.course.findUnique({
      where: { slug: String(slug) },
      include: { instructor: true, images: true, reviews: true },
    });
    if (!course) return res.status(404).json({ message: 'Kurs bulunamadı.' });
    res.json(course);
  } catch (error) {
    next(error);
  }
};
