import express from 'express';

import * as functions from './functions/communication';

const router = express.Router();

router.post('/update', functions.update);

export default router;

