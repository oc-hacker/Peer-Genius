"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus = require("http-status-codes");
const argon2 = require("argon2");
const models = require("../../database/models/index");
const auth_1 = require("../misc/auth");
const utils_1 = require("../misc/utils");
// One function for all account editing
/**
 * Response:
 * OK - edit successful
 * UNAUTHORIZED - bad password
 * BAD_REQUEST - account does not exist (usually should not happen)
 *
 * @param {EditAccountRequest} request
 * @param response
 */
exports.edit = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield models.account.find({
        where: {
            user: request.body.user.id
        }
    });
    if (!account) {
        response.status(httpStatus.BAD_REQUEST).end();
    }
    else {
        if (yield argon2.verify(account.password, request.body.password)) {
            yield account.update(request.body);
            account.save({ fields: ['email', 'password', 'verified'] });
        }
        else {
            response.status(httpStatus.UNAUTHORIZED).end();
        }
    }
});
/**
 * Just OKs the request.
 * Invalid JWT would be caught by an earlier handler. If the request reached here then it's ok.
 */
exports.verify = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).end();
});
/**
 * Sends information to the client.
 * Response format: see <code>Store</code> interface defined in <code>server/types.ts</code>
 *
 * @param request
 * @param response
 */
exports.info = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).json(yield utils_1.buildInitialStore(request.body.user.id));
});
/**
 * Refreshes the session JWT of the client.
 * Response format: {
 * 	sessionJWT: string // The new session JWT
 * }
 */
exports.refresh = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).json({ sessionJWT: auth_1.createSessionToken(request.body.user.id) });
});
//# sourceMappingURL=account.js.map