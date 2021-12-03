const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

let client = new DynamoDBClient({});

if (process.env.ENV === 'local') {
  client = new DynamoDBClient({
    region: 'ap-southeast-1',
    endpoint: 'http://localhost:8000',
  });
  console.log('Setting DynamoDB for local.');
} else {
  console.log('Setting DynamoDB for non-local.');
}

module.exports = client;
