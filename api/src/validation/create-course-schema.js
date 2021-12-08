const Joi = require('joi');
const validate = require('./validate');

const validateCreateCourseSchema = request => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    authorId: Joi.number().required(),
    length: Joi.string(),
    category: Joi.string(),
    watchHref: Joi.string().uri(),
  });

  return validate(request, schema);
};

module.exports = validateCreateCourseSchema;
