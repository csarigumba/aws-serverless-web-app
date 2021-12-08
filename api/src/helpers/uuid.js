const { v4: uuidv4 } = require('uuid');

exports.generateUUIDv4 = () => {
  return uuidv4();
};
