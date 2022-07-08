import Employee from '../interfaces/employee.interface';
import client from '../config/database';

async function findById(id: number) {
  const result = await client.query<Employee, [number]>(
    'SELECT * FROM employees WHERE id=$1',
    [id],
  );

  return result.rows[0];
}

export { findById };
