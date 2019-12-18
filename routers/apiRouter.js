const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter');
const usersRouter = require('../routers/usersRouter');
const articlesRouter = require('../routers/articlesRouter');
const commentsRouter = require('../routers/commentsRouter');
const handle405s = require('../errors')

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.all(handle405s)

module.exports = apiRouter;
