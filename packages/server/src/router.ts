import { Router } from 'express';
import { themesRouter } from './routes/theme.route.js';
import { threadRouter } from './routes/thread.route.js';
import { messageRouter } from './routes/message.route.js';
import { authGuard } from './middlewares/auth.js';

export const router = Router();

router.use('/threads', authGuard, threadRouter);
router.use('/messages', authGuard, messageRouter);
router.use('/themes', themesRouter);
