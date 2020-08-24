const { HttpError } = require('../errors/httpErrors');

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.code).json({
      status: err.code,
      error: err.message
    })
  }

  req.logger.error('Uncaught exception. Response status 500', { stack: err.stack });
  return res.sendStatus(500);
}

module.exports = errorHandler;
