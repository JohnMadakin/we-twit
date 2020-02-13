import { Router } from 'express';
import userRoutes from './userRoutes';
import followRoutes from './followRoutes';

const router = Router();

const url = '/api/v1';

router.use(url, userRoutes);
router.use(url, followRoutes);


export default router;
