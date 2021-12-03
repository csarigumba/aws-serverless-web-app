const db = require('./database/db');
const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

exports.handler = async event => {
  console.info(`Received event: ${JSON.stringify(event)}`);
  try {
    const body = JSON.parse(event.body);
    const courseId = event.pathParameters.id;

    const params = buildParams(body, courseId);
    console.log(params);
  } catch (error) {
    console.error(`An error occurred during saving to database. ${error}`);
    return utils.buildFailureResponse(error, HTTP_ERROR);
  }
};

const buildParams = (body, id) => {
  const objKeys = Object.keys(body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: marshall({ id }),
    UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(', ')}`,
  };
  return params;
};
