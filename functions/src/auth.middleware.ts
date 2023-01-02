import { NextFunction, Response, Request } from 'express';

import serviceAccount from '../serviceAccountKey.json';
import { ErrorEx } from './errors';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const auth = req.get('Authorization' || '');
    const token = auth?.replace('Bearer ', '');
    if (token !== serviceAccount.private_key_id) throw new ErrorEx({ message: 'Unauthorized', code: 401, status: 401 });
    next();
  } catch (error) {
    if (error instanceof ErrorEx) throw error;
    throw error;
  }
};
