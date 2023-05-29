import AppController from '../controllers/AppController';
 const express = require('express');

 const router = (app) => {
  const path = express.Router();
  app.use(express.json());
  app.use('/', path);

  path.get('/status', ((request, response) => AppController.getStatus(request, response)));
  path.get('/stats', ((request, response) => AppController.getStats(request, response)));
 }

 export default router;