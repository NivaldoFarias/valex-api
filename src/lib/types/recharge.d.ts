import Recharge from '../interfaces/recharge.interface';

type RechargeInsertData = Omit<Recharge, 'id' | 'timestamp'>;

export default RechargeInsertData;
