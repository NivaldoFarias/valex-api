import TransactionTypes from '../types/transaction';

interface Business {
  id: number;
  name: string;
  type: TransactionTypes;
}

export default Business;
