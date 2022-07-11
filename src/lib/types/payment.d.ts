import Payment from '../interfaces/payment.interface';

type PaymentWithBusinessName = Payment & { businessName: string };
type PaymentInsertData = Omit<Payment, 'id' | 'timestamp'>;

export { PaymentWithBusinessName, PaymentInsertData };
