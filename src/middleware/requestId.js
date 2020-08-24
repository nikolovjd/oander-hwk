const crypto = require('crypto');

const jsonBodyParser = (req, res, next) => {
  // I would use UUID here, but this will do without installing a NPM package.
  req.id = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`
  next();
};

module.exports = jsonBodyParser;
