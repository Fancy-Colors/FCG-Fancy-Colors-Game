import { Router } from 'express';
import { themesRouter } from './routes/theme.route.js';

export const router = Router();

router.use('/themes', themesRouter);
