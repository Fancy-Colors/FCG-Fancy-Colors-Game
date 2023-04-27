import { Router } from 'express';
import { themesRouter } from './routes/theme.route.js';
import { threadRouter } from './routes/thread.route.js';

export const router = Router();

router.use('/threads', threadRouter);
router.use('/themes', themesRouter);
