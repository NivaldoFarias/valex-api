import client from '../config/database';
import Business from '../interfaces/business.interface';

async function findById(id: number) {
  const result = await client.query<Business, [number]>(
    'SELECT * FROM businesses WHERE id=$1',
    [id],
  );

  return result.rows[0];
}

export { findById };
