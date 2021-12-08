const Joi = require('joi');
const validate = require('./validate');

const validateCreateAuthorSchema = request => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  });

  return validate(request, schema);
};

module.exports = validateCreateAuthorSchema;
