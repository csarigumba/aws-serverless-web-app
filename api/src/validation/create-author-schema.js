const Joi = require('joi');
const validate = require('./validate');

const validateCreateAuthorSchema = request => {
  const schema = Joi.object({
    id: Joi.number().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  });

  return validate(request, schema);
};

module.exports = validateCreateAuthorSchema;
