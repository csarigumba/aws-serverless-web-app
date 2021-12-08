const Joi = require('joi');
const validate = require('./validate');

// Reference: https://jasonwatmore.com/post/2020/07/22/nodejs-express-api-request-schema-validation-with-joi
const validateUpdateCourseSchema = request => {
  const schema = Joi.object({
    id: Joi.string().empty(''),
    title: Joi.string().empty(''),
    authorId: Joi.number().empty(''),
    length: Joi.string().empty(''),
    category: Joi.string().empty(''),
    watchHref: Joi.string().uri().empty(''),
  });

  return validate(request, schema);
};

module.exports = validateUpdateCourseSchema;
