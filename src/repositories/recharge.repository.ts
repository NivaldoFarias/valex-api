import RechargeInsertData from '../lib/types/recharge';
import Recharge from '../lib/interfaces/recharge.interface';
import client from '../config/database';
import AppLog from '../events/AppLog';

async function findByCardId(cardId: number) {
  const result = await client.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId],
  );

  AppLog('Repository', 'Recharges found');
  return result.rows;
}

async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  await client.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount],
  );
  return AppLog('Repository', 'Recharge inserted');
}

export { findByCardId, insert };
