import { Router } from 'express';
import userRoutes from './userRoutes';
import followRoutes from './followRoutes';
import postRoutes from './postRoutes';

const router = Router();

const url = '/api/v1';

router.use(url, userRoutes);
router.use(url, followRoutes);
router.use(url, postRoutes);

export default router;
