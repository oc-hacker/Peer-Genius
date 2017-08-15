import { Router } from 'express';

import * as functions from './functions/lesson';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.use('/', verifySessionToken);
router.post('/info', wrapTryCatch(functions.info));
router.post('/review', wrapTryCatch(functions.review)); // Used for both initial reviews and editing reviews.

router.use('/', wrapTryCatch(checkReview));
router.post('/request', wrapTryCatch(functions.request));
router.post('/check', wrapTryCatch(functions.check));
router.post('/accept', wrapTryCatch(functions.accept));

export default router;

