import { Request, Response } from 'express';

import * as repository from '../repositories/card.repository';
import * as service from '../services/card.service';

import Employee from '../lib/interfaces/employee.interface';
import Card from '../lib/interfaces/card.interface';

import AppLog from '../events/AppLog';

async function createCard(_req: Request, res: Response) {
  const body = res.locals.body;
  const employee: Employee = res.locals.employee;

  const securityCode = await service.newCard(employee, body.cardType);

  AppLog('Controller', 'Card created, security code sent');
  res.status(201).send({ securityCode });
}

async function activateCard(_req: Request, res: Response) {
  const card: Card = res.locals.card;
  const {
    body: { password },
  } = res.locals;

  const updateCardData = service.createBCryptPassword(card, password);
  await repository.update(card.id as number, updateCardData);

  AppLog('Controller', 'Card activated');
  return res.sendStatus(200);
}

export { createCard, activateCard };
