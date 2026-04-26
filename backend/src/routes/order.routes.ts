import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Tüm sipariş rotaları korumalı (Giriş zorunlu)
router.use(authenticate);

router.post('/', orderController.create);
router.get('/my-orders', orderController.getMyOrders);

export default router;
