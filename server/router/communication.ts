import { Router } from 'express';

import * as functions from './functions/communication';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.use('/', verifySessionToken);
router.use('/', wrapTryCatch(checkReview));
router.post('/edit', wrapTryCatch(functions.edit));

export default router;

