const articlesRouter = require('express').Router();
const { getArticlesById, patchArticleById } = require('../controllers/articlesControllers');
const { postNewComment } = require('../controllers/commentsControllers');
const { handle405s } = require('../errors');

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(patchArticleById)
  .all(handle405s);

articlesRouter
  .route('/:article_id/comments')
  .post(postNewComment)
  .all(handle405s);

module.exports = articlesRouter;
