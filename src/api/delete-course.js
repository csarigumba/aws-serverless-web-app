const { DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const db = require('./database/db');
const utils = require('./common/utils');
const { HTTP_NO_CONTENT, HTTP_NOT_FOUND_ERROR, HTTP_ERROR } = require('./common/http-status');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);

  try {
    const courseId = event.pathParameters.id;
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id: courseId }),
    };

    console.info(`Deleting item in database. CourseId=${JSON.stringify(courseId)}`);
    const result = await db.send(new DeleteItemCommand(params));
    console.info(`Successfully deleted item.`);

    console.log(result);
    return utils.buildSuccessResponse({
      statusCode: HTTP_NO_CONTENT,
    });
  } catch (error) {
    console.error(`An error occurred. ${error}`);
    return utils.buildFailureResponse(error, HTTP_ERROR);
  }
};
