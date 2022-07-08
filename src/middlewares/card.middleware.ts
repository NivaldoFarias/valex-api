import { Request, Response, NextFunction } from 'express';

import * as card from '../repositories/card.repository';
import * as entity from '../utils/entity.util';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

import Employee from '../interfaces/employee.interface';
import Company from '../interfaces/company.interface';
import Card from '../interfaces/card.interface';

async function sendQueries(_req: Request, res: Response, next: NextFunction) {
  const {
    header: apiKey,
    body: { employeeId },
  } = res.locals;
  AppLog('Middleware', 'Queries sent');

  const [companyResult, employeeResult, cards]: [Company, Employee, Card[]] =
    await Promise.all([
      entity.findEntity('companies', 'Company', `"apiKey"`, apiKey),
      entity.findEntity('employees', 'Employee', `"id"`, employeeId),
      card.find(),
    ]);

  res.locals.cards = cards;
  res.locals.company = companyResult;
  res.locals.employee = employeeResult;
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

export { sendQueries, employeeHasOnlyOneCard };
