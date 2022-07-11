import { Router } from 'express';

import cardRouter from './card.route';
import paymentRouter from './payment.route';
import rechargeRouter from './recharge.route';

const router = Router();

router.use('/cards', cardRouter);
router.use('/payments', paymentRouter);
router.use('/recharges', rechargeRouter);

export default router;
