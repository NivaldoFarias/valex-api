import SqlString from 'sqlstring';

import AppError from '../config/error';
import AppLog from '../events/AppLog';
import client from '../config/database';

async function findEntity(
  table: string,
  entity: string,
  column: string,
  key: string | number,
) {
  const query = SqlString.format(
    `SELECT * FROM ${table} WHERE ${column} = ? LIMIT 1`,
    [key],
  );
  const result = await client.query(query);
  const row = result.rows[0];

  if (!row) {
    if (column === 'apiKey') {
      throw new AppError(
        'Invalid API key',
        401,
        'Invalid API key',
        'Ensure to provide a valid API key',
      );
    }
    throw new AppError(
      `${entity} not found`,
      404,
      `${entity} not found`,
      `Ensure to provide a valid ${entity} key`,
    );
  }

  AppLog('Util', `${entity} found`);
  return row;
}

export { findEntity };
