import { PaymentInsertData, PaymentWithBusinessName } from '../types/payment';
import client from '../config/database';

async function findByCardId(cardId: number) {
  const result = await client.query<PaymentWithBusinessName, [number]>(
    `SELECT 
      payments.*,
      businesses.name as "businessName"
    FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
    WHERE "cardId"=$1
    `,
    [cardId],
  );

  return result.rows;
}

async function insert(paymentData: PaymentInsertData) {
  const { cardId, businessId, amount } = paymentData;

  client.query<any, [number, number, number]>(
    `INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3)`,
    [cardId, businessId, amount],
  );
}

export { findByCardId, insert };
