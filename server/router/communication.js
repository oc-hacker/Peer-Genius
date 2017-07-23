"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const functions = require("./functions/communication");
const utils_1 = require("./misc/utils");
const auth_1 = require("./misc/auth");
const router = express_1.Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!
router.post('/getMethods', utils_1.wrapTryCatch(functions.getMethods));
router.use('/', auth_1.verifySessionToken);
router.post('/update', utils_1.wrapTryCatch(functions.update));
exports.default = router;
//# sourceMappingURL=communication.js.map