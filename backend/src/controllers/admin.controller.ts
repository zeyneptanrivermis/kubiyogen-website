import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';

/**
 * @openapi
 * tags:
 *   name: Admin
 *   description: Yönetici CRUD işlemleri (Auth & ADMIN rolü gerektirir)
 */

// --- COURSES ---
/**
 * @openapi
 * /api/admin/courses:
 *   post:
 *     tags: [Admin]
 *     summary: Yeni kurs oluştur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Oluşturuldu
 */
export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await prisma.course.create({ data: req.body });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /api/admin/courses/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Kursu güncelle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Güncellendi
 *   delete:
 *     tags: [Admin]
 *     summary: Kursu sil
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Silindi
 */
export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.update({
      where: { id: String(id) },
      data: req.body,
    });
    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id: String(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// --- EVENTS ---
/**
 * @openapi
 * /api/admin/events:
 *   post:
 *     tags: [Admin]
 *     summary: Yeni etkinlik oluştur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Oluşturuldu
 */
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await prisma.event.create({ data: req.body });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /api/admin/events/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Etkinliği güncelle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Güncellendi
 *   delete:
 *     tags: [Admin]
 *     summary: Etkinliği sil
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Silindi
 */
export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.update({
      where: { id: String(id) },
      data: req.body,
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({ where: { id: String(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// --- PRODUCTS ---
/**
 * @openapi
 * /api/admin/products:
 *   post:
 *     tags: [Admin]
 *     summary: Yeni ürün oluştur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Oluşturuldu
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await prisma.product.create({ data: req.body });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /api/admin/products/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Ürünü güncelle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Güncellendi
 *   delete:
 *     tags: [Admin]
 *     summary: Ürünü sil
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Silindi
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id: String(id) },
      data: req.body,
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: String(id) } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
