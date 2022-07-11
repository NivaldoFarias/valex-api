import { Request, Response } from 'express';
import AppLog from '../events/AppLog';

async function newRecharge(_req: Request, res: Response) {
  AppLog('Controller', 'Recharge created');
  res.sendStatus(201);
}

export { newRecharge };
