const { HTTP_NOT_FOUND_ERROR } = require('../common/http-status');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = HTTP_NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
