import { Router } from 'express';

import * as functions from './functions/api';
import { wrapTryCatch } from './misc/utils';
import accountRouter from './account';
import chatRouter from './chat';
import courseRouter from './course';
import guruRouter from './guru';
import newbieRouter from './newbie';
import notificationRouter from './notification';
import sessionRouter from './session';
import userRouter from './user';
import { urlencoded } from 'body-parser';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

// For expected response, see docs for the buildStore method in misc/utils
router.post('/createAccount', wrapTryCatch(functions.createAccount));
router.post('/login', wrapTryCatch(functions.verifyLogin));
router.get('/config', wrapTryCatch(functions.getConfig));
router.post('/checkEmail', wrapTryCatch(functions.checkEmail));

router.post('/db', urlencoded({ extended: true }), functions._db);

// If JWT token is  verifying session token will give UNAUTHORIZED and return {reason: 'Invalid session'}
router.use('/account', accountRouter);
router.use('/chat', chatRouter);
router.use('/course', courseRouter);
router.use('/guru', guruRouter);
router.use('/newbie', newbieRouter);
router.use('/notification', notificationRouter);
router.use('/session', sessionRouter);
router.use('/user', userRouter);

export default router;
