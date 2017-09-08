import { Router } from 'express';

import * as functions from './functions/chat';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.use('/', verifySessionToken);

router.post('/getMessages', wrapTryCatch(functions.getMessages));
router.post('/getConversations', wrapTryCatch(functions.getConversations);

export default router;
