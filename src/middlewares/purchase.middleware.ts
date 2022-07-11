import { Request, Response, NextFunction } from 'express';

import * as service from '../services/purchase.service';
import * as entity from '../utils/entity.util';

import Card from '../interfaces/card.interface';
import Business from '../interfaces/business.interface';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

const CURRENT_YEAR = new Date().getFullYear().toString().slice(2);
const CURRENT_MONTH = new Date().getMonth().toString();

async function newPurchaseQueries(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    body: {
      card: { id: cardId },
      businessId,
    },
  } = res.locals;
  AppLog('Middleware', 'Queries sent');

  const [card, business]: [Card, Business] = await Promise.all([
    entity.findEntity('cards', 'Card', `"id"`, cardId),
    entity.findEntity('businesses', 'Business', `"id"`, businessId),
  ]);

  res.locals.card = card;
  res.locals.business = business;
  return next();
}

function newPurchaseValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    body: {
      card: { password },
    },
  } = res.locals;
  const card: Card = res.locals.card;
  const business: Business = res.locals.business;

  const {
    password: cardPassword,
    expirationDate,
    isBlocked,
    type: cardType,
  } = card;
  const { type: businessType } = business;

  validatePassword();
  validExpirationDate();
  isCardBlocked();
  cardTypeCorrespondsToBusinessType();

  return next();

  function validatePassword() {
    const decrypted = service.decryptPassword(password, cardPassword as string);
    const invalidPassword = decrypted !== password;

    if (invalidPassword) {
      throw new AppError(
        `Invalid password`,
        403,
        `Invalid password`,
        'Ensure to provide a valid password',
      );
    }
  }

  function validExpirationDate() {
    const [month, year] = expirationDate.split('/');
    const invalidExpirationDate =
      year < CURRENT_YEAR || (year === CURRENT_YEAR && month < CURRENT_MONTH);

    if (invalidExpirationDate) {
      throw new AppError(
        `Invalid expiration date`,
        403,
        `Invalid expiration date`,
        'The provided card is expired',
      );
    }
  }

  function isCardBlocked() {
    if (isBlocked) {
      throw new AppError(
        `Card is blocked`,
        403,
        `Card is blocked`,
        'The provided card is blocked',
      );
    }
  }

  function cardTypeCorrespondsToBusinessType() {
    const invalidType = cardType !== businessType;

    if (invalidType) {
      throw new AppError(
        `Card type does not correspond to business type`,
        403,
        `Card type does not correspond to business type`,
        'The provided card type does not correspond to the business type',
      );
    }
  }
}

export { newPurchaseQueries, newPurchaseValidations };
