import { Router } from 'express';

import authEndpoints from '@entities/auth/endpoints';
import userEndpoints from '@entities/user/endpoints';
import accountEndpoints from '@entities/account/endpoints';
import transactionEndPoints from '@entities/transaction/endpoints';
const router = Router();

router.use('/', authEndpoints);
router.use('/users', userEndpoints);
router.use('/accounts',accountEndpoints);
router.use('/transactions',transactionEndPoints);

export default router;
