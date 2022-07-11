import { Router } from 'express';

import cardRouter from './card.route';
import paymentRouter from './payment.route';

const router = Router();

router.use('/cards', cardRouter);
router.use('/payments', paymentRouter);

export default router;
