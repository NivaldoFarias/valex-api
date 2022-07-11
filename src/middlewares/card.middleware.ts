import { Request, Response, NextFunction } from 'express';

import * as repository from '../repositories/card.repository';
import * as service from '../services/card.service';
import * as entity from '../utils/entity.util';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

import Employee from '../lib/interfaces/employee.interface';
import Company from '../lib/interfaces/company.interface';
import Card from '../lib/interfaces/card.interface';

async function newCardQueries(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    header: apiKey,
    body: { employeeId },
  } = res.locals;
  AppLog('Middleware', 'Queries sent');

  const [company, employee, cards]: [Company, Employee, Card[]] =
    await Promise.all([
      entity.findEntity('companies', 'Company', `"apiKey"`, apiKey),
      entity.findEntity('employees', 'Employee', `"id"`, employeeId),
      repository.find(),
    ]);

  res.locals.cards = cards;
  res.locals.company = company;
  res.locals.employee = employee;
  return next();
}

function employeeHasOnlyOneCard(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const employee: Employee = res.locals.employee;
  const cards: Card[] = res.locals.cards;
  let employeeCards = 0;

  for (const card of cards) {
    card.employeeId === employee.id ? ++employeeCards : null;
    if (employeeCards > 1) {
      throw new AppError(
        'Employee has more than one card',
        403,
        'Employee has more than one card',
        'An employee can only have one card',
      );
    }
  }

  return next();
}

async function getCardData(_req: Request, res: Response, next: NextFunction) {
  const {
    body: { cardId },
  } = res.locals;
  AppLog('Middleware', 'Queries sent');

  const card: Card = await repository.findById(cardId);

  if (!card) {
    throw new AppError(
      'Card not found',
      404,
      'Card not found',
      'Ensure to provide a valid card id',
    );
  }

  res.locals.card = card;
  return next();
}

async function activateCardValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: Card = res.locals.card;
  const {
    body: { securityCode },
  } = res.locals;

  if (service.isCardAlreadyActive(card)) {
    throw new AppError(
      'Card is already active',
      403,
      'Card is already active',
      'A card can only be activated once',
    );
  }
  AppLog('Middleware', 'Card is not yet active');

  if (!service.validSecurityCode(card, securityCode)) {
    throw new AppError(
      'Invalid security code',
      403,
      'Invalid security code',
      'Ensure to provide a valid security code',
    );
  }
  AppLog('Middleware', 'Valid security code');

  return next();
}

function blockCardValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: Card = res.locals.card;
  const { password, isBlocked, expirationDate } = card;

  service.isCardActive(password as string);
  AppLog('Middleware', 'Card is active');

  service.isCardBlocked(isBlocked);
  AppLog('Middleware', 'Card is not blocked');

  service.validExpirationDate(expirationDate);
  AppLog('Middleware', 'Valid Expiration Date');

  return next();
}

function unblockCardValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: Card = res.locals.card;
  const { password, isBlocked, expirationDate } = card;

  service.isCardActive(password as string);
  AppLog('Middleware', 'Card is active');

  service.isCardBlocked(isBlocked);
  AppLog('Middleware', 'Card is not blocked');

  service.validExpirationDate(expirationDate);
  AppLog('Middleware', 'Valid Expiration Date');

  return next();
}

export {
  newCardQueries,
  employeeHasOnlyOneCard,
  getCardData,
  activateCardValidations,
  blockCardValidations,
  unblockCardValidations,
};
