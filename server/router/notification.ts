import { Router } from 'express';

import { getNotifications } from './functions/notification';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.post('/unread', wrapTryCatch(getNotifications));
router.post('/read', wrapTryCatch(getNotifications));
router.use('/', verifySessionToken);
router.use('/', wrapTryCatch(checkReview));

export default router;
