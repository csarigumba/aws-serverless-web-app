const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
});

exports.handler = async event => {
  const params = {
    Key: {
      id: {
        S: event.id,
      },
    },
    TableName: 'courses',
  };
  await dynamodb.deleteItem(params).promise();
};
