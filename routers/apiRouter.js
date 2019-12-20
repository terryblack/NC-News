const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter');
const usersRouter = require('../routers/usersRouter');
const articlesRouter = require('../routers/articlesRouter');
const commentsRouter = require('../routers/commentsRouter');
const {getApiJson} = require('../controllers/apiController.js')
const {handle405s} = require('../errors')

apiRouter.route('/').get(getApiJson).all(handle405s)
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
