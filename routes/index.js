import AppController from '../controllers/AppController';
 const express = require('express');

 const router = (app) => {
  const path = express.Router();
  app.use(express.json());
  app.use('/', path);

  paths.get('/status', ((request, response) => AppController.getStatus(request, response)));
  paths.get('/stats', ((request, response) => AppController.getStats(request, response)));
 }