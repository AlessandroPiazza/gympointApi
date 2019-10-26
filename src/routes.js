/* eslint-disable linebreak-style */
import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import PlansController from './app/controllers/PlansController';
import SessionController from './app/controllers/SessionController';
import RegistrationController from './app/controllers/RegistrationController';
import authMiddleware from './app/middlewares/auth';


const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);

routes.put('/students/:id', StudentController.update);

routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);
routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);

routes.post('/registrations', RegistrationController.store);

export default routes;
