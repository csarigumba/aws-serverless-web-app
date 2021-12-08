const { GetItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const db = require('./database/db');
const utils = require('./helpers/utils');
const { HTTP_OK } = require('./common/http-status');
const validateCreateCourseSchema = require('./validation/update-course-schema');
const NotFoundError = require('./exception/not-found');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);
  try {
    const course = JSON.parse(event.body);
    const courseId = event.pathParameters.id;
    validateCreateCourseSchema(course);

    const foundCourse = await findCourse(courseId);
    if (!foundCourse) {
      console.info(`Course not exist. CourseId=${courseId}`);
      throw new NotFoundError(`Course not found. CourseId=${courseId}`);
    }

    await update(course, courseId);

    const updatedCourse = await findCourse(courseId);
    return utils.buildSuccessResponse({
      data: updatedCourse,
      statusCode: HTTP_OK,
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
  return course ? unmarshall(course) : null;
};

const update = async (course, courseId) => {
  const params = buildUpdateParams(course, courseId);

  console.log(`Updating item. CourseId=${courseId}, Params=${JSON.stringify(params, null, 2)}`);
  await db.send(new UpdateItemCommand(params));
  console.info(`Successfully updated item. Course=${JSON.stringify(course)}`);
};

const buildUpdateParams = (body, id) => {
  // Reference: https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/dynamodb/src/ddb_updateitem.js
  const objKeys = Object.keys(body);
  const updateExpression = `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(', ')}`;
  const expressionAttributeNames = objKeys.reduce(
    (acc, key, index) => ({
      ...acc,
      [`#key${index}`]: key,
    }),
    {}
  );
  const expressionAttributeValues = marshall(
    objKeys.reduce(
      (acc, key, index) => ({
        ...acc,
        [`:value${index}`]: body[key],
      }),
      {}
    )
  );

  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: marshall({ id }),
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  };
  return params;
};
