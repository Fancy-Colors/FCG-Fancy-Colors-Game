import { Router } from 'express';
import { ThemeController } from '../controllers/theme.controller.js';

export const themesRouter = Router();

themesRouter.get('/', ThemeController.find);
themesRouter.post('/', ThemeController.create);
themesRouter.put('/:id', ThemeController.update);
themesRouter.delete('/:id', ThemeController.delete);
