import { Router } from 'express';
import { ThemeController } from '../controllers/theme.controller.js';

export const themesRouter = Router();

themesRouter.put('/', ThemeController.update);
