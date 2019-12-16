const articlesRouter = require('express').Router();
const { getArticlesById } = require('../controllers/articlesControllers');
const { handle405s } = require('../errors');

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .all(handle405s);

module.exports = articlesRouter;
