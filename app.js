const express = require('express');
const app = express();
const { handle500s } = require('./errors');

app.use(express.json());

app.use(handle500s);

module.exports = app;
