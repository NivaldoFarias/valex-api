import { Request, Response } from 'express';

import Employee from '../interfaces/employee.interface';
import * as service from '../services/card.service';

async function createCard(_req: Request, res: Response) {
  const body = res.locals.body;
  const employee: Employee = res.locals.employee;

  await service.newCard(employee, body.cardType);

  res.sendStatus(201);
}

async function activateCard(_req: Request, res: Response) {
  res.sendStatus(200);
}

export { createCard, activateCard };
