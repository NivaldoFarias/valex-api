import { Router } from 'express';

import * as controller from '../controllers/purchase.controller';
import validateSchema from '../middlewares/schema.middleware';
import purchaseSchema from '../models/purchase.model';

const cardRouter = Router();
const endpoint = '/purchases';

cardRouter.post(
  '/',
  validateSchema(purchaseSchema, `${endpoint}/`),
  controller.newPurchase,
);
