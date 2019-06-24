const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const { handlePsqlErrors, handleCustomErrors, routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
 res.status(200).send({ msg: "welcome to the nc-news website, please explore by going to /api route" });
});

app.use('/api', apiRouter);

app.use(handlePsqlErrors)

app.use(handleCustomErrors);

app.all('/*', routeNotFound);

app.use(handle500);

module.exports = app;
