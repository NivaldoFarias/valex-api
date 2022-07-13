import { Router } from 'express';

import * as controller from '../controllers/card.controller';
import * as middleware from '../middlewares/card.middleware';

import validateSchema from '../middlewares/schema.middleware';
import processHeader from '../middlewares/header.middleware';

import activateCardSchema from '../models/activateCard.model';
import cardRequestSchema from '../models/cardRequest.model';
import blockCardSchema from '../models/blockCard.model';

const cardRouter = Router();
const endpoint = '/cards';
const header = 'x-api-key';

const cardRequestEndpoint = `/create`;
cardRouter.post(
  cardRequestEndpoint,
  validateSchema(cardRequestSchema, endpoint + cardRequestEndpoint),
  processHeader(header, endpoint + cardRequestEndpoint),
  middleware.newCardQueries,
  middleware.employeeHasOnlyOneCard,
  controller.createCard,
);

const activateCardEndpoint = `/activate`;
cardRouter.post(
  activateCardEndpoint,
  validateSchema(activateCardSchema, endpoint + activateCardEndpoint),
  middleware.getCardData,
  middleware.activateCardValidations,
  controller.activateCard,
);

const blockCardEndpoint = `/block`;
cardRouter.post(
  blockCardEndpoint,
  validateSchema(blockCardSchema, endpoint + blockCardEndpoint),
  middleware.getCardData,
  middleware.blockCardValidations,
  controller.blockCard,
);

const unblockCardEndpoint = `/unblock`;
cardRouter.post(
  unblockCardEndpoint,
  validateSchema(blockCardSchema, endpoint + unblockCardEndpoint),
  middleware.getCardData,
  middleware.unblockCardValidations,
  controller.unblockCard,
);

export default cardRouter;
