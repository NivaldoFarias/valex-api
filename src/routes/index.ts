import { Router } from 'express';

import cardRouter from './card.route';

const router = Router();

router.use('/cards', cardRouter);

export default router;
