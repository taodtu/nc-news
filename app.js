const express = require('express');
const apiRouter = require('./routes/api');
const { handlePsqlErrors, handleCustomErrors, routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(handlePsqlErrors)

app.use(handleCustomErrors);

app.all('/*', routeNotFound);

app.use(handle500);

module.exports = app;
