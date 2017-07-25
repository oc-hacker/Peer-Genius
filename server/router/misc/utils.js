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
const path = require("path");
const fs = require("fs");
const lodash_1 = require("lodash");
const httpStatus = require("http-status-codes");
const models = require("../../database/models/index");
const user_1 = require("../../database/models/user");
const errors_1 = require("../../database/errors");
const auth_1 = require("./auth");
exports.logger = (request, response, next) => {
    console.log(`[${new Date().toUTCString()}]`, 'Request received at', request.originalUrl);
    next();
};
exports.sendIndex = (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../../public/index.html'));
};
const errorLogPath = path.resolve(__dirname, '../../errors.log');
// Clear up error log on start
fs.writeFileSync(errorLogPath, '');
exports.errorHandler = (error, request, response, next) => {
    if (error instanceof errors_1.ProhibitedEditError) {
        console.warn([
            `[${new Date().toUTCString()}]`,
            `Request at ${request.originalUrl} attempted make a forbidden edit. The request processing has been aborted.`,
            'Details available in error log.'
        ].join('\n'));
        fs.appendFile(errorLogPath, [
            `[${new Date().toUTCString()}] Blocked edit request:`,
            `Error message: ${error.message}`,
            JSON.stringify(request.body, null, '\t'),
            ''
        ].join('\n'));
        response.status(httpStatus.FORBIDDEN).end();
    }
    else if (error === 'Request blocked by CORS.') {
        console.warn(`Request at ${request.originalUrl} blocked by CORS.`);
        response.status(httpStatus.BAD_REQUEST).end();
    }
    else {
        const timeStamp = new Date().toUTCString();
        console.error(`[${timeStamp}] Unexpected error when handling request at ${request.originalUrl}\nDetails will be logged to error log.`);
        fs.appendFile(errorLogPath, [
            `[${timeStamp}] Server handling error!`,
            `Error message:`,
            `${error}`,
            `Request details:`,
            JSON.stringify(request.body, null, '\t'),
            ''
        ].join('\n'));
        response.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
};
exports.endResponse = (request, response) => {
    response.end();
};
/**
 * Note: account.verified indicates whether the account's email has been verified.
 *
 * @param id
 * @param [user]
 * @param [account]
 * @return {Promise.<Store>}
 */
exports.buildInitialStore = (id, user, account) => __awaiter(this, void 0, void 0, function* () {
    user = user || (yield models.user.find({
        where: {
            id
        }
    }));
    account = account || (yield models.account.find({
        where: {
            user: id
        }
    }));
    let store = {};
    store.account = lodash_1.pick(account, ['email', 'verified']);
    store.user = lodash_1.pick(user, user_1.exposedAttributes);
    store.sessionJWT = auth_1.createSessionToken(id);
    return store;
});
/**
 * Wraps the handler in a higher order function to catch any error that the handler throws and pass it to express's error handler.
 */
exports.wrapTryCatch = (handler) => (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield handler(request, response, next);
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=utils.js.map