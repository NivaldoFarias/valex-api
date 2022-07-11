import { Request, Response } from 'express';

import * as repository from '../repositories/recharge.repository';
import AppLog from '../events/AppLog';

async function newRecharge(_req: Request, res: Response) {
  const { id: cardId } = res.locals.card;
  const { amount }: { amount: number } = res.locals.body;

  const rechargeData = { cardId, amount };
  await repository.insert(rechargeData as { cardId: number; amount: number });

  AppLog('Controller', 'Recharge created');
  res.sendStatus(201);
}

export { newRecharge };
