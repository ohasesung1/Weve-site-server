const BaseJoi = require('@hapi/joi');
const Joi = BaseJoi.extend(require('@hapi/joi-date'));

exports.validateRegisterUser = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    pw: Joi.string().required(),
    display_name: Joi.string().required(),
  });

  try {
    return await Joi.validate(body, schema);
  } catch(error) {
    throw error;
  }
}
