import * as functions from 'firebase-functions';
import express, { NextFunction, Response, Request, ErrorRequestHandler, Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { ErrorEx, ErrorData } from './errors';
import TextController from './text.controller';
import { authMiddleware } from './auth.middleware';

/***Main server */
const main: Express = express();
/***V1 server */
const server: Express = express();

server.use(
  cors({
    origin: '*',
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
  }),
);

server.use(authMiddleware);

// --------Text handler-----------
const router = express.Router();
router.get('/', TextController.getAll);
router.get('/:id', TextController.getById);
router.post('/', TextController.add);
router.put('/:id', TextController.rewriteById);
router.patch('/:id', TextController.updateById);
router.delete('/:id', TextController.delete);

// Routers:
server.use('/', router);

// Main server options
main.disable('x-powered-by');
main.enable('trust proxy');
main.use(express.json());
main.use(express.urlencoded());
main.use(helmet());

main.get('/', function (_req: Request, res: Response) {
  res.status(200).send({
    ok: true,
    data: { text: 'Hello world', v1: true, v2: false },
  });
});

// Error handlers
main.use((_req: Request, _res: Response, next: NextFunction): void => {
  const err = new ErrorEx({ message: 'Resource not found', code: 404, status: 404 });
  next(err);
});

main.use((err: ErrorRequestHandler & ErrorData, _req: Request, res: Response, _: NextFunction): void => {
  const code = err.code || err.status || 500;
  const status = err.status || err.code || 500;
  const reason = err.message || 'Internal Server Error';

  res.status(status).json({
    ok: false,
    error: {
      reason,
      code,
    },
  });
});

//Main server routers
main.use('/v1', server);

// Expose Express API as a single Cloud Function:
export const app = functions
  .runWith({ minInstances: 0, maxInstances: 3000, timeoutSeconds: 540, memory: '256MB' })
  .https.onRequest(main);
