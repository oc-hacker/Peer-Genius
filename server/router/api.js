import express from 'express';

import * as functions from './functions/api';
import { verifySessionToken } from './misc/auth';
import accountRouter from './account';

const router = express.Router();

router.post('/create', functions.createAccount);
router.post('/login', functions.verifyLogin);

router.use('/account', verifySessionToken);
router.use('/account', accountRouter);

export default router;
