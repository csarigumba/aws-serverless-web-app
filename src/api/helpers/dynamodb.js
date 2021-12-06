const db = require('../database/db');
const { paginateScan } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

const scanTable = async tableName => {
  console.info(`Running scan in database. Table=${tableName}`);
  const scanPaginator = paginateScan(
    { client: db },
    {
      TableName: tableName,
    }
  );

  const items = [];
  for await (const page of scanPaginator) {
    page.Items && page.Items.forEach(item => items.push(unmarshall(item)));
  }

  console.info(`Total scanned items: ${items.length}`);
  return items;
};

module.exports = {
  scanTable,
};
