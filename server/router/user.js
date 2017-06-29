import express from 'express';

import * as functions from './functions/user';

const router = express.Router();

router.post('/edit', functions.edit);

export default router;
