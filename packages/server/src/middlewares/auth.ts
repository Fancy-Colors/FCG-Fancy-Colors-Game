import type { RequestHandler } from 'express';
import { getCurrentUser } from '../http/user.js';
import { ErrorResponse } from '../utils/error-response.js';
import httpContext from 'express-http-context';

export const authContext: RequestHandler = async (req, _res, next) => {
  const user = await getCurrentUser(req);
  httpContext.set('user', user);
  next();
};

export const authGuard: RequestHandler = (_req, _res, next) => {
  const user = httpContext.get('user');
  if (user) return next();
  next(new ErrorResponse('Not Authorized', 401));
};
