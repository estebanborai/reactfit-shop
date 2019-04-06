import { Router } from 'express';
import product from './product';

const router = Router();

router.use('/api/products', product);

export default router;
