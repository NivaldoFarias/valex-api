import bcrypt from 'bcrypt';
import './../config/setup';
import AppLog from '../events/AppLog';

function decryptPassword(password: string, cryptedPassword: string) {
  const boolean = !bcrypt.compareSync(password, cryptedPassword);

  AppLog('Service', 'Decrypted password');
  return boolean;
}

export { decryptPassword };
