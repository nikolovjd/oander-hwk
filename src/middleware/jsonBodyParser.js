const { BadRequestError, UnsupportedMediaTypeError } = require('../errors/httpErrors');

const jsonBodyParser = (req, res, next) => {
  if (req.method === 'POST' && !req.is('application/json')) {
     throw new UnsupportedMediaTypeError();
  }

  let data = '';

  req.on('data', (chunk) => {
    data += chunk
  });

  req.on('end', () => {
    if (!data) {
      return next();
    }

    let body;

    try {
      body = JSON.parse(data);
    } catch (err) {
      throw new BadRequestError('Invalid JSON');
    }

    req.body = body;
    next();
  })
};

module.exports = jsonBodyParser;
