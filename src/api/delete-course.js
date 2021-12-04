const { GetItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const db = require('./database/db');
const utils = require('./common/utils');
const { HTTP_NO_CONTENT } = require('./common/http-status');
const NotFoundError = require('./exception/not-found');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);

  try {
    const courseId = event.pathParameters.id;

    const foundCourse = await findCourse(courseId);
    if (!foundCourse) {
      console.info(`Course not exist. CourseId=${courseId}`);
      throw new NotFoundError(`Course not found. CourseId=${courseId}`);
    }

    await deleteCourse(courseId);
    return utils.buildSuccessResponse({
      statusCode: HTTP_NO_CONTENT,
    });
  } catch (error) {
    console.error(`An error occurred. ${error}`);
    return utils.buildFailureResponse(error, error.statusCode);
  }
};

const findCourse = async courseId => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: marshall({ id: courseId }),
  };

  console.info(`Retrieving item in database. CourseId=${courseId}`);
  let { Item: course } = await db.send(new GetItemCommand(params));
  return course;
};

const deleteCourse = async courseId => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: marshall({ id: courseId }),
  };

  console.info(`Deleting item in database. CourseId=${JSON.stringify(courseId)}`);
  await db.send(new DeleteItemCommand(params));
  console.info(`Successfully deleted item.`);
};
