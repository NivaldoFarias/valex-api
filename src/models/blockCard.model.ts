import Joi from 'joi';

const passwordRegex = /^\d{4}$/;
const blockCardSchema = Joi.object({
  cardId: Joi.number().integer().positive().required(),
  password: Joi.string().length(4).pattern(passwordRegex).required(),
});

export default blockCardSchema;
