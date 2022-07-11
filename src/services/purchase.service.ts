import bcrypt from 'bcrypt';
import './../config/setup';

function decryptPassword(password: string, cryptedPassword: string) {
  const decrypted = bcrypt.compareSync(password, cryptedPassword);
  return decrypted;
}

export { decryptPassword };
