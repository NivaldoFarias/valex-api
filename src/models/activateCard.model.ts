import Joi from 'joi';

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const activateCardSchema = Joi.object({
  cardId: Joi.number().integer().positive().required(),
  securityCode: Joi.string().length(3).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export default activateCardSchema;
