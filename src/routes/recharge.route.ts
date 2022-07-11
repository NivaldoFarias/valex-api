import { Router } from 'express';

import * as controller from '../controllers/recharge.controller';
import * as middleware from '../middlewares/recharge.middleware';

import validateSchema from '../middlewares/schema.middleware';
import processHeader from '../middlewares/header.middleware';

import rechargeSchema from '../models/recharge.model';

const rechargeRouter = Router();
const endpoint = '/recharges';
const header = 'x-api-key';

rechargeRouter.post(
  '/',
  validateSchema(rechargeSchema, `${endpoint}/`),
  processHeader(header, `${endpoint}/`),
  middleware.newRechargeQueries,
  middleware.newRechargeValidations,
  controller.newRecharge,
);

export default rechargeRouter;
