import { Router } from 'express';

import * as functions from './functions/session';
import { wrapTryCatch } from './misc/utils';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.post('/create', wrapTryCatch(functions.create));
router.post('/review', wrapTryCatch(functions.review));

export default router;

