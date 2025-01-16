import express from 'express';
import tipsController from './tips.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticateToken);

router.get('/api/tips', tipsController.getTips);

export default router;
