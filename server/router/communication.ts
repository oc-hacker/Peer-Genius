import { Router } from 'express';

import * as functions from './functions/communication';
import { wrapTryCatch } from './misc/utils';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.post('/update', wrapTryCatch(functions.update));

export default router;

