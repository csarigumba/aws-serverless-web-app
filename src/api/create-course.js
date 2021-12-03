const db = require('./database/db');
const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const utils = require('./common/utils');
const { HTTP_OK, HTTP_ERROR } = require('./common/http-status');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);

  try {
    const body = JSON.parse(event.body);
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(body || {}),
    };

    console.info(`Saving item to database. Item=${JSON.stringify(body)}, Table=${process.env.DYNAMODB_TABLE_NAME}.`);
    const result = await db.send(new PutItemCommand(params));

    console.info(`Successfully saved item.`);
    return utils.buildSuccessResponse({
      data: result,
      message: 'Successfully created course',
      statusCode: HTTP_OK,
    });
  } catch (error) {
    console.error(`An error occurred during saving to database. ${error}`);
    return utils.buildFailureResponse(error, HTTP_ERROR);
  }
};
