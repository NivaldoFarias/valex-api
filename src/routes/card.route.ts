import { Router } from 'express';

import * as controller from '../controllers/card.controller';
import * as middleware from '../middlewares/card.middleware';

import validateSchema from '../middlewares/schema.middleware';
import processHeader from '../middlewares/header.middleware';

import activateCardSchema from '../models/activateCard.model';
import cardRequestSchema from '../models/cardRequest.model';

const cardRouter = Router();
const endpoint = '/cards';
const header = 'x-api-key';

cardRouter.post(
  '/create',
  validateSchema(cardRequestSchema, `${endpoint}/create`),
  processHeader(header, endpoint),
  middleware.sendQueries,
  middleware.employeeHasOnlyOneCard,
  controller.createCard,
);
cardRouter.post(
  '/activate',
  validateSchema(activateCardSchema, `${endpoint}/activate`),
  controller.activateCard,
);

export default cardRouter;
