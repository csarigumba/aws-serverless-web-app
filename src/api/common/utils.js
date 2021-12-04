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
  const response = {
    statusCode,
    body: JSON.stringify({
      message: error ? error.message : 'An internal server error occurred.',
      stack: error.stack,
    }),
  };
  return response;
};

module.exports = {
  buildSuccessResponse,
  buildFailureResponse,
};
