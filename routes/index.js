import UserController from '../controllers/UsersController';

const express = require('express');

const router = (app) => {
  const path = express.Router();
  app.use(express.json());
  app.use('/', path);

  path.get('/status', ((request, response) => UserController.getStatus(request, response)));
  path.get('/stats', ((request, response) => UserController.getStats(request, response)));
  path.post('/users', ((request, response) => UserController.postNew(request, response)));
};

export default router;
