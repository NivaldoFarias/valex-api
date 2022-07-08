import { Request, Response } from 'express';

import * as service from '../services/card.service';

import TransactionTypes from '../types/transaction.type';
import Employee from '../interfaces/employee.interface';

type ReqBody = {
  employee: Employee;
  cardType: TransactionTypes;
};

async function createCard(_req: Request, res: Response) {
  const body: ReqBody = res.locals.body;
  const { employee, cardType } = body;

  await service.newCard(employee, cardType);

  res.sendStatus(201);
}

export { createCard };
