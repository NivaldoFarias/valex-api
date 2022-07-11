import { Request, Response, NextFunction } from 'express';

import { CURRENT_YEAR, CURRENT_MONTH } from '../utils/constants.util';
import * as entity from '../utils/entity.util';

import Company from '../lib/interfaces/company.interface';
import Card from '../lib/interfaces/card.interface';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function newRechargeQueries(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    body: { cardId },
    header: apiKey,
  } = res.locals;
  AppLog('Middleware', 'Queries sent');

  const [card, company]: [Card, Company] = await Promise.all([
    entity.findEntity('cards', 'Card', `"id"`, cardId),
    entity.findEntity('companies', 'Company', `"apiKey"`, apiKey),
  ]);

  res.locals.card = card;
  res.locals.company = company;
  return next();
}

function newRechargeValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: Card = res.locals.card;
  const { password, expirationDate, isBlocked } = card;

  isCardActive();
  isCardBlocked();
  validExpirationDate();

  return next();

  function isCardActive() {
    if (!password) {
      throw new AppError(
        'Card is not active',
        403,
        'Card is not active',
        'Ensure to provide a card that is active',
      );
    }

    return AppLog('Middleware', 'Card is active');
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

    return AppLog('Middleware', 'Card is not blocked');
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

    return AppLog('Middleware', 'Valid Expiration Date');
  }
}

export { newRechargeQueries, newRechargeValidations };
