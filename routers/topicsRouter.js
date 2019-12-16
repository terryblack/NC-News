const topicsRouter = require('express').Router();
const { getAllTopics } = require('../contollers/getAllTopics');

topicsRouter.use('/', getAllTopics);

module.exports = topicsRouter;
