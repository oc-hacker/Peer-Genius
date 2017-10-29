import { Router } from 'express';

import * as functions from './functions/course';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

<<<<<<< HEAD
router.post('/list', wrapTryCatch(functions.list));
=======
router.get('/list', wrapTryCatch(functions.list));
router.use('/', verifySessionToken);
>>>>>>> fce66c47e00835dfaa926d8032eca5c9bf016361

export default router;
