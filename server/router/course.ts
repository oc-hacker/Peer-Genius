import { Router } from 'express';

import * as functions from './functions/course';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.get('/list', wrapTryCatch(functions.list));
router.use('/', verifySessionToken);

export default router;
