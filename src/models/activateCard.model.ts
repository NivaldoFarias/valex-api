import Joi from 'joi';

const passwordRegex = /^\d{4}$/;
const activateCardSchema = Joi.object({
  cardId: Joi.number().integer().positive().required(),
  securityCode: Joi.string().length(3).required(),
  password: Joi.string().length(4).pattern(passwordRegex).required(),
});

export default activateCardSchema;
