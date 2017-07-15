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
const lodash_1 = require("lodash");
const http_status_codes_1 = require("http-status-codes");
const argon2_1 = require("argon2");
const utils_1 = require("../misc/utils");
const index_1 = require("../../database/models/index");
const user_1 = require("../../database/models/user");
// Note: only use next() if you are not handling the request!
/**
 * @param {{body: {
 *     email: String,
 *     password: String,
 *     firstName: String,
 *     lastName: String,
 *     birthday: {year, month, day}
 * }}} request
 * @param response
 */
exports.createAccount = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield index_1.default.account.find({
        where: {
            email: request.body.email
        }
    });
    if (account) {
        // Email already exists.
        response.status(http_status_codes_1.default.CONFLICT).end();
    }
    else {
        // OK
        let user = yield index_1.default.user.create(lodash_1.default.pick(request.body, user_1.exposedAttributes));
        let account = yield index_1.default.account.create({
            user: user.id,
            email: request.body.email,
            password: request.body.password
        });
        let store = yield utils_1.buildInitialStore(user.id, user, account);
        response.status(http_status_codes_1.default.OK).json(store);
        let key = yield index_1.default.key.uniqueRandom('verifyEmailKey');
        // TODO send email
    }
});
/**
 * This method will send UNAUTHORIZED if email and password do not match, and BAD_REQUEST if email is not in the database.
 *
 * @param {{body: {email: String, password: String}}} request
 * @param response
 * @return {Promise.<void>}
 */
exports.verifyLogin = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield index_1.default.account.find({
        where: {
            email: request.body.email
        }
    });
    if (account) {
        if (yield argon2_1.default.verify(account.password, request.body.password)) {
            response.status(http_status_codes_1.default.OK).json(yield utils_1.buildInitialStore(account.user, null, account));
        }
        else {
            response.status(http_status_codes_1.default.UNAUTHORIZED).end();
        }
    }
    else {
        response.status(http_status_codes_1.default.BAD_REQUEST).end();
    }
});
/**
 * @param {{body: {email: String}}} request
 * @param response
 */
exports.checkEmail = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield index_1.default.account.find({
        where: {
            email: request.body.email
        }
    });
    response.status(http_status_codes_1.default.OK).json({ taken: !!account });
});
//# sourceMappingURL=api.js.map