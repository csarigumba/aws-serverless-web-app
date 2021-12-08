const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const db = require('./database/db');
const utils = require('./helpers/utils');
const validateCreateAuthorSchema = require('./validation/create-author-schema');
const { HTTP_CREATED } = require('./common/http-status');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);

  try {
    const course = JSON.parse(event.body);
    validateCreateAuthorSchema(course);

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(course || {}),
    };

    console.info(`Saving item to database. Item=${JSON.stringify(course)}, Table=${process.env.DYNAMODB_TABLE_NAME}.`);
    await db.send(new PutItemCommand(params));

    console.info(`Successfully saved item.`);
    return utils.buildSuccessResponse({
      statusCode: HTTP_CREATED,
    });
  } catch (error) {
    console.error(`An error occurred during saving to database. ${error}`);
    return utils.buildFailureResponse(error, error.statusCode);
  }
};
