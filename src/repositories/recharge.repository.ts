import RechargeInsertData from '../lib/types/recharge';
import Recharge from '../lib/interfaces/recharge.interface';
import client from '../config/database';

async function findByCardId(cardId: number) {
  const result = await client.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId],
  );

  return result.rows;
}

async function insert(rechargeData: RechargeInsertData) {
  const { cardId, amount } = rechargeData;

  client.query<any, [number, number]>(
    `INSERT INTO recharges ("cardId", amount) VALUES ($1, $2)`,
    [cardId, amount],
  );
}

export { findByCardId, insert };
