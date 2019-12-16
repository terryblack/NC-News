const usersRouter = require('express').Router();
const { getUserByUserName } = require('../controllers/userControllers');
const { handle405s } = require('../errors');

usersRouter
  .route('/:username')
  .get(getUserByUserName)
  .all(handle405s);

module.exports = usersRouter;
