import { Router } from 'express';
import authRoutes from './auth.routes';
import courseRoutes from './course.routes';
import eventRoutes from './event.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';
import adminRoutes from './admin.routes';
import * as categoryController from '../controllers/category.controller';

const router = Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/events', eventRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);

// Categories
router.get('/categories', categoryController.getAll);

export default router;
