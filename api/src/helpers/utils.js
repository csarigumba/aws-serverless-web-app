const { HTTP_ERROR } = require('../common/http-status');
const buildSuccessResponse = ({ statusCode, data }) => {
  const response = {
    statusCode,
  };

  if (data) {
    response.body = JSON.stringify(data);
  }
  return response;
};

const buildFailureResponse = (error, statusCode) => {
  statusCode = statusCode ?? HTTP_ERROR;
  const response = {
    statusCode,
    body: JSON.stringify({
      message: error ? error.message : 'An internal server error occurred.',
      details: error.stack,
    }),
  };
  return response;
};

module.exports = {
  buildSuccessResponse,
  buildFailureResponse,
};
