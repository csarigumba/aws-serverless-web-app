const Joi = require('joi');
const validate = require('./validate');

const validateCreateCourseSchema = request => {
  const schema = Joi.object({
    title: Joi.string().required(),
    authorId: Joi.string().required(),
    length: Joi.string(),
    category: Joi.string(),
    watchHref: Joi.string().uri(),
  });

  return validate(request, schema);
};

module.exports = validateCreateCourseSchema;
