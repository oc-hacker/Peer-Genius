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
const http_status_codes_1 = require("http-status-codes");
const argon2_1 = require("argon2");
const index_1 = require("../../database/models/index");
const auth_1 = require("../misc/auth");
const utils_1 = require("../misc/utils");
// One function for all account editing
/**
 * @param {{body: {
 *     password: String,
 *     newEmail: String?,
 *     newPassword: String
 * }}} request
 * @param response
 */
exports.edit = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield index_1.default.account.find({
        where: {
            user: request.body.user.id
        }
    });
    if (!account) {
        response.status(http_status_codes_1.default.BAD_REQUEST).end();
    }
    else {
        if (yield argon2_1.default.verify(account.password, request.body.password)) {
            yield account.update(request.body);
            account.save({ fields: ['email', 'password', 'verified'] });
        }
        else {
            response.status(http_status_codes_1.default.UNAUTHORIZED).end();
        }
    }
});
/**
 * Just OKs the request.
 * Invalid JWT would be caught by an earlier handler. If the request reached here then it's ok.
 */
exports.verify = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(http_status_codes_1.default.OK).end();
});
/**
 * Sends information to the client.
 * @param request
 * @param response
 * @return {Promise.<void>}
 */
exports.info = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(http_status_codes_1.default.OK).json(yield utils_1.buildInitialStore(request.body.user.id));
});
/**
 * Refreshes the session JWT of the client.
 */
exports.refresh = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(http_status_codes_1.default.OK).json({ sessionJWT: auth_1.createSessionToken(request.body.user.id) });
});
//# sourceMappingURL=account.js.map