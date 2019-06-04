exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};
exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = ['22P02', '23503', '42703'];
  if (psqlBadRequestCodes.includes(err.code))
    res.status(400).send({ msg: err.msg || 'Bad Request' });
  else next(err);
};