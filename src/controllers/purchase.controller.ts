import { Request, Response } from 'express';

async function newPurchase(_req: Request, res: Response) {
  return res.sendStatus(201);
}

export { newPurchase };
