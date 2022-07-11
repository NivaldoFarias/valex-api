import chalk from 'chalk';

import LogTypes from '../lib/types/log';
import Logs from '../lib/interfaces/log.interface';

const types: Logs = {
  Middleware: 'magenta',
  Controller: 'green',
  Repository: 'blue',
  Server: 'yellow',
  Service: 'cyan',
  Util: 'cyan',
  Error: 'red',
};
const AppLog = (type: LogTypes, text: string) => {
  console.log(
    chalk.bold[
      types[type] as 'green' | 'magenta' | 'blue' | 'yellow' | 'cyan' | 'red'
    ](`[${type}] ${text}`),
  );
};

export default AppLog;
