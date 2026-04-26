import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Tüm benzersiz kurs ve ürün kategorilerini getir
 *     responses:
 *       200:
 *         description: Başarılı
 */
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Kurs kategorilerini çek
    const courseCategories = await prisma.course.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    // Ürün kategorileri (şu an modelde yok ama eklemek gerekebilir, şimdilik kursları verelim)
    const categories = courseCategories.map(c => c.category);

    res.json({
      courseCategories: categories,
      productCategories: ['Aksesuar', 'Defter', 'Çanta'], // Şimdilik manuel veya ürün modeline göre
    });
  } catch (error) {
    next(error);
  }
};
