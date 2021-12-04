const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const db = require('./database/db');
const utils = require('./common/utils');
const { HTTP_OK, HTTP_ERROR } = require('./common/http-status');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);
  try {
    const course = JSON.parse(event.body);
    const courseId = event.pathParameters.id;

    const params = buildUpdateParams(course, courseId);
    console.log(`Updating item. CourseId=${courseId}, Params=${JSON.stringify(params, null, 2)}`);
    await db.send(new UpdateItemCommand(params));

    course.id = courseId;
    console.info(`Successfully updated item. Course=${JSON.stringify(course)}`);

    return utils.buildSuccessResponse({
      data: course,
      message: '',
      statusCode: HTTP_OK,
    });
  } catch (error) {
    console.error(`An error occurred. ${error}`);
    return utils.buildFailureResponse(error, HTTP_ERROR);
  }
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
