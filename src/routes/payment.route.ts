import { Router } from 'express';

import * as controller from '../controllers/payment.controller';

import validateSchema from '../middlewares/schema.middleware';
import paymentSchema from '../models/payment.model';

const paymentRouter = Router();
const endpoint = '/payments';

paymentRouter.post(
  '/',
  validateSchema(paymentSchema, `${endpoint}/`),
  controller.newPayment,
);
