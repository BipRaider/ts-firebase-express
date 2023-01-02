import * as admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';
import { Response, Request, NextFunction } from 'express';

import serviceAccount from '../serviceAccountKey.json';
import config from '../config.json';
import { ErrorEx } from './errors';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
  }),
  databaseURL: config.databaseURL,
});

class TextController {
  static getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const db = getDatabase();
      const ref = await db.ref('/text').get();

      const data = ref.val() as unknown;
      res.status(200).send({
        ok: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  static getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const db = getDatabase();
      const ref = db.ref(`/text`).child(id);

      const refGet = await ref.get();
      const data = refGet.val() as unknown;

      if (!data) throw new ErrorEx({ message: 'Not Found', code: 404, status: 404 });

      res.status(200).send({
        ok: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  static add = async (
    { body }: Request<unknown, unknown, { text: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { text } = body;
      const db = admin.database();
      const ref = db.ref('/text');
      const postsRef = await ref.push({
        text: text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      res.status(200).send({
        ok: true,
        data: { id: postsRef.key },
      });
    } catch (error) {
      next(error);
    }
  };

  static updateById = async (
    req: Request<{ id: string }, unknown, { text: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const db = getDatabase();
      const ref = db.ref(`/text`).child(id);

      const refGet = await ref.get();
      const data = refGet.val() as unknown;
      if (!data) throw new ErrorEx({ message: 'Not Found', code: 404, status: 404 });

      await ref.update({ text, updatedAt: new Date().toISOString() });

      const upData = await ref.get();

      res.status(200).send({
        ok: true,
        data: upData.val() as unknown,
      });
    } catch (error) {
      next(error);
    }
  };

  static rewriteById = async (
    req: Request<{ id: string }, unknown, object>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const db = getDatabase();
      const ref = db.ref(`/text`).child(id);

      const refGet = await ref.get();
      const data = refGet.val() as unknown;
      if (!data) throw new ErrorEx({ message: 'Not Found', code: 404, status: 404 });

      await ref.set({ ...payload, updatedAt: new Date().toISOString() });
      const upData = await ref.get();

      res.status(200).send({
        ok: true,
        data: upData.val() as unknown,
      });
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const db = getDatabase();
      const ref = db.ref(`/text`).child(id);

      const refGet = await ref.get();
      const data = refGet.val() as unknown;
      if (!data) throw new ErrorEx({ message: 'Bad Request', code: 400, status: 400 });

      await ref.remove();

      res.status(200).send({
        ok: true,
        data: `${id} remove`,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TextController;
