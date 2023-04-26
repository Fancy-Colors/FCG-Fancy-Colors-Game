import { Router } from 'express';
import { MessageController } from '../controllers/message.controller.js';

export const messageRouter = Router();

messageRouter.get('/:threadId', MessageController.findAll);
messageRouter.post('/:threadId', MessageController.create);
messageRouter.get('/:threadId/count', MessageController.count);
messageRouter.get('/:id/common', MessageController.find);
