import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import DestinatarioController from './app/controllers/DestinatarioController';
import DeliveryManController from './app/controllers/DeliveryManController';
import OrdersController from './app/controllers/OrdersController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/destinatarios', DestinatarioController.store);

routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.delete);

routes.post('/orders', OrdersController.store);
routes.get('/orders', OrdersController.index);
routes.put('/orders/:id', OrdersController.update);
routes.delete('/orders/:id', OrdersController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
