const BadRequestError = require('../exception/bad-request');

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const validate = (request, schema) => {
  const { error, value } = schema.validate(request, options);
  if (error) {
    const details = error.details.map(x => x.message).join(', ');
    throw new BadRequestError(details);
  } else {
    return value;
  }
};

module.exports = validate;
