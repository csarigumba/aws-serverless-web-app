const { scanTable } = require('./helpers/dynamodb');
const utils = require('./helpers/utils');
const { HTTP_OK, HTTP_ERROR } = require('./common/http-status');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);

  try {
    const courses = await scanTable(process.env.DYNAMODB_TABLE_NAME);
    console.debug(`Scanned items=${JSON.stringify(courses)}`);

    return utils.buildSuccessResponse({
      data: courses,
      statusCode: HTTP_OK,
    });
  } catch (error) {
    console.error(`An error occurred. ${error}`);
    return utils.buildFailureResponse(error, HTTP_ERROR);
  }
};
