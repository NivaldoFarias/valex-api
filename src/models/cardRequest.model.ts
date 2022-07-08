import Joi from 'joi';

const cardRequestSchema = Joi.object({
  employeeId: Joi.number().positive().integer().required(),
  cardType: Joi.string()
    .valid('groceries', 'restaurants', 'transport', 'education', 'health')
    .required(),
});

export default cardRequestSchema;
