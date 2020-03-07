import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import DestinatarioController from './app/controllers/DestinatarioController';
import DeliveryManController from './app/controllers/DeliveryManController';

import DeliveryOrderController from './app/controllers/DeliveryOrderController';
import DeliveryOrderConcludController from './app/controllers/DeliveryOrderConcludController';

import DeliveryManStartController from './app/controllers/DeliveryManStartController';
import DeliveryManEndController from './app/controllers/DeliveryManEndController';

import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import OrdersController from './app/controllers/OrdersController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/orders', DeliveryOrderController.index);
routes.get(
  '/deliveryman/:id/orders/concluded',
  DeliveryOrderConcludController.index
);

routes.post('/delivery/:id/problems', DeliveryProblemController.store);

// Atualizar data de inicio da encomenda
routes.put('/deliveries/:id/start-date', DeliveryManStartController.update);
routes.put('/deliveries/:id/end-date', DeliveryManEndController.update);

// Todas as rotas após 'use(authMiddleware)' precisam enviar um jsonwebtoken(jwt)
// Criado no SessionController, o token é uma forma de autenticação de usuários.
// Daqui em diante apenas usuários autenticados podem acessar essas rotas
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/destinatarios', DestinatarioController.store);
routes.get('/destinatarios', DestinatarioController.index);
routes.put('/destinatarios/:id', DestinatarioController.update);
routes.delete('/destinatarios/:id', DestinatarioController.delete);

routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.delete);

// Encomenda comdata inicial e final
routes.get('/deliveries/start-date', DeliveryManStartController.index);
routes.get('/deliveries/end-date', DeliveryManEndController.index);

routes.get('/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);

routes.post('/orders', OrdersController.store);
routes.get('/orders', OrdersController.index);
routes.put('/orders/:id', OrdersController.update);
routes.delete('/orders/:id', OrdersController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
