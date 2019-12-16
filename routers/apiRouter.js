const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter')
const usersRouter = require('../routers/usersRouter')
const articlesRouter = require('../routers/articlesRouter')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/articles', articlesRouter)

module.exports = apiRouter