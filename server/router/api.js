"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const functions = require("./functions/api");
const auth_1 = require("./misc/auth");
const utils_1 = require("./misc/utils");
const account_1 = require("./account");
const user_1 = require("./user");
const communication_1 = require("./communication");
const mentor_1 = require("./mentor");
const router = express_1.Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!
// For expected response, see docs for the buildInitialStore method in misc/utils
router.post('/createAccount', utils_1.wrapTryCatch(functions.createAccount));
router.post('/login', utils_1.wrapTryCatch(functions.verifyLogin));
router.post('/checkEmail', utils_1.wrapTryCatch(functions.checkEmail));
// If JWT token is  verifying session token will give UNAUTHORIZED and return {reason: 'Invalid session'}
router.use('/account', auth_1.verifySessionToken);
router.use('/account', account_1.default);
router.use('/user', auth_1.verifySessionToken);
router.use('/user', user_1.default);
router.use('/communication', auth_1.verifySessionToken);
router.use('/communication', communication_1.default);
router.use('/mentor', auth_1.verifySessionToken);
router.use('/mentor', mentor_1.default);
exports.default = router;
//# sourceMappingURL=api.js.map