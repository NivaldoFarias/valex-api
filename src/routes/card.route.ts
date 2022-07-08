import { Router } from 'express';

import * as controller from '../controllers/card.controller';
import * as middleware from '../middlewares/card.middleware';

import cardRequestSchema from '../models/cardRequest.model';
import processHeader from '../middlewares/header.middleware';
import validateSchema from '../middlewares/schema.middleware';

const cardRouter = Router();
const endpoint = '/cards';
const header = 'x-api-key';

cardRouter.post(
  '/',
  validateSchema(cardRequestSchema, endpoint),
  processHeader(header, endpoint),
  middleware.sendQueries,
  middleware.employeeHasOnlyOneCard,
  controller.createCard,
);

export default cardRouter;
