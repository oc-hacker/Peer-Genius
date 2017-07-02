import express from 'express';

import * as functions from './functions/api';
import { verifySessionToken } from './misc/auth';
import { wrapTryCatch } from './misc/utils';
import accountRouter from './account';
import userRouter from './user';
import communicationRouter from './communication';

const router = express.Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

// For expected response, see docs for the buildInitialStore method in misc/utils
router.post('/createAccount', wrapTryCatch(functions.createAccount));
router.post('/login', wrapTryCatch(functions.verifyLogin));
router.post('/checkEmail', wrapTryCatch(functions.checkEmail));

// If JWT token is  verifying session token will give UNAUTHORIZED and return {reason: 'Invalid session'}
router.use('/account', verifySessionToken);
router.use('/account', accountRouter);
router.use('/user', verifySessionToken);
router.use('/user', userRouter);
router.use('/communication', verifySessionToken);
router.use('/communication', communicationRouter);

export default router;
