import TransactionTypes from '../types/transaction.type';

interface Business {
  id: number;
  name: string;
  type: TransactionTypes;
}

export default Business;
