import express from 'express';

import * as functions from './functions/api';
import { verifySessionToken } from './misc/auth';
import accountRouter from './account';
import userRouter from './user';
import communicationRouter from './communication';

const router = express.Router();

router.post('/createAccount', functions.createAccount);
router.post('/login', functions.verifyLogin);

router.use('/account', verifySessionToken);
router.use('/account', accountRouter);
router.use('/user', verifySessionToken);
router.use('/user', userRouter);
router.use('/communication', verifySessionToken);
router.use('/communication', communicationRouter);

export default router;
