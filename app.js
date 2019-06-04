const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
 res.status(404).send({ msg: 'Invalid user ID' })
});

app.all('/*', routeNotFound);

app.use(handle500);

module.exports = app;
