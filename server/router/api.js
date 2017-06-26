import express from 'express';

import * as functions from './functions/api';
import { verifySessionToken } from './misc/auth';
import accountRouter from './account';
import userRouter from './user';

const router = express.Router();

router.post('/create', functions.createAccount);
router.post('/login', functions.verifyLogin);

router.use('/account', verifySessionToken);
router.use('/account', accountRouter);
router.use('/user', verifySessionToken);
router.use('/user', userRouter);

export default router;
