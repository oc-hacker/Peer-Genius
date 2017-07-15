"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const functions = require("./functions/user");
const utils_1 = require("./misc/utils");
const router = express_1.Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!
router.post('/edit', utils_1.wrapTryCatch(functions.edit));
exports.default = router;
//# sourceMappingURL=user.js.map