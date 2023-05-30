import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import AppController from '../controllers/AppController';

const express = require('express');

const router = (app) => {
  const path = express.Router();
  app.use(express.json());
  app.use('/', path);

  path.get('/status', ((request, response) => AppController.getStatus(request, response)));
  path.get('/stats', ((request, response) => AppController.getStats(request, response)));

  path.post('/users', ((request, response) => UsersController.postNew(request, response)));

  path.get('/connect', ((request, response) => AuthController.getConnect(request, response)));
  path.get('/disconnect', ((request, response) => AuthController.getDisconnect(request, response)));
  path.get('/users/me', ((request, response) => UsersController.getMe(request, response)));
};

export default router;
