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

routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);
routes.get('/plans', PlansController.index);
routes.delete('/plans/:id', PlansController.delete);

routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.get('/registrations/:id?', RegistrationController.index);
routes.delete('/registrations/:id', RegistrationController.delete);

export default routes;
