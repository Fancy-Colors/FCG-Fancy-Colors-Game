import type { RequestHandler } from 'express';
import crypto from 'node:crypto';

export const cspNonce: RequestHandler = (_req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
  next();
};
