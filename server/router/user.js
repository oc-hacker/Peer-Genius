"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const functions = require("./functions/user");
const utils_1 = require("./misc/utils");
const auth_1 = require("./misc/auth");
const router = express_1.Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!
router.use('/', auth_1.verifySessionToken);
router.post('/edit', utils_1.wrapTryCatch(functions.edit));
exports.default = router;
//# sourceMappingURL=user.js.map