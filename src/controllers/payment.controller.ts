import { Request, Response } from 'express';

import * as repository from '../repositories/payment.repository';

import { PaymentInsertData } from '../lib/types/payment';
import Business from '../lib/interfaces/business.interface';
import Card from '../lib/interfaces/card.interface';

import AppLog from '../events/AppLog';

async function newPayment(_req: Request, res: Response) {
  const card: Card = res.locals.card;
  const business: Business = res.locals.business;
  const amount: number = res.locals.body.amount;

  const cardId = Number(card.id);
  const businessId = business.id;

  const paymentData: PaymentInsertData = {
    cardId,
    businessId,
    amount,
  };

  await repository.insert(paymentData);

  AppLog('Controller', 'Payment created');
  return res.sendStatus(201);
}

export { newPayment };
