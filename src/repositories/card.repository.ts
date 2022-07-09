import { mapObjectToUpdateQuery } from '../utils/object.util';
import client from '../config/database';

import { CardInsertData, CardUpdateData } from '../types/card.type';
import TransactionTypes from '../types/transaction.type';
import Card from '../interfaces/card.interface';

async function find() {
  const result = await client.query<Card>(`SELECT * FROM cards`);
  return result.rows;
}

async function findById(id: number) {
  const result = await client.query<Card, [number]>(
    'SELECT * FROM cards WHERE id=$1',
    [id],
  );

  return result.rows[0];
}

async function findByTypeAndEmployeeId(
  type: TransactionTypes,
  employeeId: number,
) {
  const result = await client.query<Card, [TransactionTypes, number]>(
    `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
    [type, employeeId],
  );

  return result.rows[0];
}

async function findByCardDetails(
  number: string,
  cardholderName: string,
  expirationDate: string,
) {
  const result = await client.query<Card, [string, string, string]>(
    ` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
    [number, cardholderName, expirationDate],
  );

  return result.rows[0];
}

async function insert(cardData: CardInsertData) {
  const {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  } = cardData;

  client.query(
    `
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `,
    [
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type,
    ],
  );
}

async function update(id: number, cardData: CardUpdateData) {
  const { objectColumns: cardColumns, objectValues: cardValues } =
    mapObjectToUpdateQuery({
      object: cardData,
      offset: 2,
    });

  client.query(
    `
    UPDATE cards
      SET ${cardColumns}
    WHERE $1=id
  `,
    [id, ...cardValues],
  );
}

async function remove(id: number) {
  client.query<any, [number]>('DELETE FROM cards WHERE id=$1', [id]);
}

export {
  find,
  findById,
  findByTypeAndEmployeeId,
  findByCardDetails,
  insert,
  update,
  remove,
};
