import { Router } from 'express';

import * as functions from './functions/communication';
import { wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.post('/getMethods', wrapTryCatch(functions.getMethods));
router.use('/', verifySessionToken);
router.post('/update', wrapTryCatch(functions.update));

export default router;

