import { Router } from 'express';

import * as functions from './functions/mentor';
import { wrapTryCatch } from './misc/utils';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.post('/find', wrapTryCatch(functions.find));

export default router;

