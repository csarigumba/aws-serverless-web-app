const { HTTP_BAD_REQUEST } = require('../common/http-status');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = HTTP_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
