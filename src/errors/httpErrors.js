class HttpError extends Error {
  constructor(code, message) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

class UnsupportedMediaTypeError extends HttpError {
  constructor(message = 'Unsupported Media Type') {
    super(415, message);
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  NotFoundError,
  UnsupportedMediaTypeError
};
