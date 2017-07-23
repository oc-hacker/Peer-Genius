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
exports.edit = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield models.account.find({
        where: {
            user: request.body.user.id
        }
    });
    if (yield argon2.verify(account.password, request.body.password)) {
        yield account.update(request.body);
        yield account.save({ fields: ['email', 'password', 'verified'] });
        response.status(httpStatus.OK).end();
    }
    else {
        response.status(httpStatus.UNAUTHORIZED).end();
    }
});
exports.verify = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).end();
});
exports.info = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).json(yield utils_1.buildInitialStore(request.body.user.id));
});
exports.refresh = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).json({ sessionJWT: auth_1.createSessionToken(request.body.user.id) });
});
//# sourceMappingURL=account.js.map