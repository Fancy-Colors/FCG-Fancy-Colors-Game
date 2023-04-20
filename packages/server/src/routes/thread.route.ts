import { Router } from 'express';
import { ThreadController } from '../controllers/thread.controller.js';

export const threadRouter = Router();

threadRouter.get('/', ThreadController.findAll);
threadRouter.post('/', ThreadController.create);
threadRouter.get('/count', ThreadController.count);
threadRouter.get('/find/:id', ThreadController.find);
