const logger = require('../logger');

const requestLogger = (req, res, next) => {
  req.logger = logger.child({
    requestId: req.id,
    path: req.originalUrl,
    method: req.method
  });
  next();
};

module.exports = requestLogger;
