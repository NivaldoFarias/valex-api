import Card from '../interfaces/card.interface';

type CardInsertData = Omit<Card, 'id'>;
type CardUpdateData = Partial<Card>;

export { CardInsertData, CardUpdateData };
