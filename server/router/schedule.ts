import { Router } from 'express';

import * as functions from './functions/schedule';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.use('/', verifySessionToken);
router.post('/getCurrentRequests', wrapTryCatch(functions.getCurrentRequests));
router.post('/scheduleSession', wrapTryCatch(functions.scheduleSession));
router.post('/getPastSessions', wrapTryCatch(functions.getPastSessions));
router.post('/acceptSession', wrapTryCatch(functions.acceptSession));
router.post('/getScheduledSessions', wrapTryCatch(functions.getScheduledSessions));

export default router;
