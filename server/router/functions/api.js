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
const httpStatus = require("http-status-codes");
const argon2 = require("argon2");
const utils_1 = require("../misc/utils");
const models = require("../../database/models");
const key_1 = require("../../database/models/key");
const user_1 = require("../../database/models/user");
/**
 * Response:
 * OK - account creation successful. An initial store will be sent. See <code>Store</code> interface defined in <code>server/types.ts</code> for details.
 * CONFLICT - email already used
 */
exports.createAccount = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield models.account.find({
        where: {
            email: request.body.email
        }
    });
    console.log(account);
    if (account) {
        // Email already exists.
        response.status(httpStatus.CONFLICT).end();
    }
    else {
        // OK
        let user = yield models.user.create(lodash_1.pick(request.body, user_1.exposedAttributes));
        let account = yield models.account.create({
            user: user.id,
            email: request.body.email,
            password: request.body.password
        });
        yield models.communication.create(Object.assign({ user: user.id }, request.body.communication));
        let store = yield utils_1.buildInitialStore(user.id, user, account);
        response.status(httpStatus.OK).json(store);
        let key = yield key_1.uniqueRandom('verifyEmailKey');
        // TODO send email
    }
});
/**
 * Response:
 * OK - login successful. An initial store will be sent. See <code>Store</code> interface defined in <code>server/types.ts</code> for details.
 * UNAUTHORIZED - bad email or password
 */
exports.verifyLogin = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield models.account.find({
        where: {
            email: request.body.email
        }
    });
    if (account && (yield argon2.verify(account.password, request.body.password))) {
        response.status(httpStatus.OK).json(yield utils_1.buildInitialStore(account.user, null, account));
    }
    else {
        response.status(httpStatus.UNAUTHORIZED).end();
    }
});
/**
 * Checks whether an email is in use.
 * Response:
 * OK - the request will always be OK. Field <code>taken</code> in response body will indicate whether the email has been taken.
 */
exports.checkEmail = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield models.account.find({
        where: {
            email: request.body.email
        }
    });
    response.status(httpStatus.OK).json({ taken: !!account });
});
//# sourceMappingURL=api.js.map