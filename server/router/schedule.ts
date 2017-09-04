import { Router } from 'express';

import * as functions from './functions/schedule';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.use('/', verifySessionToken);
router.use('/getCurrentRequests', wrapTryCatch(functions.getCurrentRequests));
router.use('/scheduleSession', wrapTryCatch(functions.scheduleSession));
router.use('/getPastSessions', wrapTryCatch(functions.getPastSessions));
router.use('/acceptSession', wrapTryCatch(functions.acceptSession));
router.use('/getScheduledSessions', wrapTryCatch(functions.getScheduledSessions));

export default router;