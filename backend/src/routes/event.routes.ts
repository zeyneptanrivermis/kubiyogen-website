import { Router } from 'express';
import * as eventController from '../controllers/event.controller';

const router = Router();

router.get('/', eventController.getAll);
router.get('/upcoming', eventController.getUpcoming);
router.get('/recent', eventController.getRecent);
router.get('/:slug', eventController.getBySlug);

export default router;
