const { GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = require('./database/db');
const utils = require('./common/utils');
const { HTTP_OK, HTTP_ERROR } = require('./common/http-status');
const ValidationError = require('./exception/not-found');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);

  try {
    const courseId = event.pathParameters.id;

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id: courseId }),
    };

    console.info(`Retrieving item in database. CourseId=${courseId}`);
    let { Item: course } = await db.send(new GetItemCommand(params));

    if (course) {
      course = course ? unmarshall(course) : {};
      console.info(`Successfully retrieved item. Course=${JSON.stringify(course)}`);
      return utils.buildSuccessResponse({
        data: course,
        statusCode: HTTP_OK,
      });
    } else {
      console.info(`Course not exist. CourseId=${courseId}`);
      throw new ValidationError(`Course not exist. CourseId=${courseId}`);
    }
  } catch (error) {
    console.error(`An error occurred. ${error}`);
    return utils.buildFailureResponse(error, error.statusCode);
  }
};
