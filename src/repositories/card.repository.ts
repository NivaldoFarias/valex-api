import client from '../config/database';

import { CardInsertData, CardUpdateData } from '../lib/types/card';
import TransactionTypes from '../lib/types/transaction';
import Card from '../lib/interfaces/card.interface';

import { mapObjectToUpdateQuery } from '../utils/object.util';
import AppLog from '../events/AppLog';

async function find() {
  AppLog('Repository', 'Find all cards');
  const result = await client.query<Card>(`SELECT * FROM cards`);
  return result.rows;
}

async function findById(id: number) {
  AppLog('Repository', 'Find card by id');

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
  AppLog('Repository', 'Find card by type and employee id');
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
  AppLog('Repository', 'Find card by card details');
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

  AppLog('Repository', 'Insert card');
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

  AppLog('Repository', 'Update card');
  await client.query(
    `
    UPDATE cards
      SET ${cardColumns}
    WHERE $1=id
  `,
    [id, ...cardValues],
  );
}

async function remove(id: number) {
  AppLog('Repository', 'Remove card');
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
