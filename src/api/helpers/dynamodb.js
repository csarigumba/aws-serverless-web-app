const db = require('../database/db');
const { ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

const scanTable = async tableName => {
  console.info(`Running scan in database. Table=${tableName}`);
  const params = {
    TableName: tableName,
  };

  const items = [];
  let lastEvaluatedKey;
  do {
    const scanResults = await db.send(new ScanCommand(params));
    lastEvaluatedKey = scanResults.LastEvaluatedKey;
    scanResults.Items.forEach(item => items.push(unmarshall(item)));
  } while (lastEvaluatedKey !== undefined);

  return items;
};

module.exports = {
  scanTable,
};
