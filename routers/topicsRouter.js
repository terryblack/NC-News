const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topicsControllers');

topicsRouter.use('/', getAllTopics);

module.exports = topicsRouter;
