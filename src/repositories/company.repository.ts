import Company from '../lib/interfaces/company.interface';
import client from '../config/database';

async function findByApiKey(apiKey: string) {
  const result = await client.query<Company, [string]>(
    `SELECT * FROM companies WHERE "apiKey"=$1`,
    [apiKey],
  );

  return result.rows[0];
}

export { findByApiKey };
