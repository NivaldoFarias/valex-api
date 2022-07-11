import Joi from 'joi';

const rechargeSchema = Joi.object({
  cardId: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().positive().required(),
});

export default rechargeSchema;
