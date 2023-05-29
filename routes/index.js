import UsersController from '../controllers/UsersController';

const express = require('express');

const router = (app) => {
  const path = express.Router();
  app.use(express.json());
  app.use('/', path);

  path.get('/status', ((request, response) => UsersController.getStatus(request, response)));
  path.get('/stats', ((request, response) => UsersController.getStats(request, response)));
  path.post('/users', ((request, response) => UsersController.postNew(request, response)));
};

export default router;
