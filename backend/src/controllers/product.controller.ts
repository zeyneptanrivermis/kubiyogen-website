import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Tüm ürünleri getir (Sayfalama ve Sıralama ile)
 *     parameters:
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
 * /api/products/{slug}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Slug ile ürün detayı getir
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
 *         description: Ürün bulunamadı
 */
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: { images: true },
      }),
      prisma.product.count(),
    ]);

    res.json({
      data: products,
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
    const product = await prisma.product.findUnique({
      where: { slug: String(slug) },
      include: { images: true, reviews: true },
    });
    if (!product) return res.status(404).json({ message: 'Ürün bulunamadı.' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};
