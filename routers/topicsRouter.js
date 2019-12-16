const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topicsControllers');
const { handle405s } = require('../errors');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .all(handle405s);

module.exports = topicsRouter;
