import { Router } from 'express';

import * as functions from './functions/account';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.use('/', verifySessionToken);
router.post('/verify', wrapTryCatch(functions.verify));
router.post('/info', wrapTryCatch(functions.info));
router.post('/refresh', wrapTryCatch(functions.refresh));

router.use('/', wrapTryCatch(checkReview));
router.post('/edit', wrapTryCatch(functions.edit));

export default router;
