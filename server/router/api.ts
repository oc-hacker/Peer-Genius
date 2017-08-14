import { Router } from 'express';

import * as functions from './functions/api';
import { verifySessionToken } from './misc/auth';
import { wrapTryCatch } from './misc/utils';
import accountRouter from './account';
import communicationRouter from './communication';
import mentorRouter from './mentor';
import sessionRouter from './session';
import userRouter from './user';
import { urlencoded } from 'body-parser';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

// For expected response, see docs for the buildStore method in misc/utils
router.post('/createAccount', wrapTryCatch(functions.createAccount));
router.post('/login', wrapTryCatch(functions.verifyLogin));
router.post('/checkEmail', wrapTryCatch(functions.checkEmail));

router.post('/db', urlencoded({ extended: true }), functions._db);

// If JWT token is  verifying session token will give UNAUTHORIZED and return {reason: 'Invalid session'}
router.use('/account', accountRouter);
router.use('/communication', communicationRouter);
router.use('/mentor', mentorRouter);
router.use('/session', sessionRouter);
router.use('/user', userRouter);

export default router;
