import Joi from 'joi';

const passwordRegex = /^\d{4}$/;
const purchaseSchema = Joi.object({
  card: Joi.object({
    id: Joi.number().integer().positive().required(),
    password: Joi.string().length(4).pattern(passwordRegex).required(),
  }).required(),
  businessId: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().positive().required(),
});

export default purchaseSchema;
