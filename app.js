const express = require('express');
const app = express();
const { handle500s, handle404s, handle400s } = require('./errors');
const apiRouter = require('./routers/apiRouter');

app.use(express.json());
app.use('/api', apiRouter);

app.use(handle400s);

app.all('/*', handle404s);
app.use(handle500s);

module.exports = app;
