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
const index_1 = require("../../database/models/index");
const user_1 = require("../../database/models/user");
// One function for all user editing
/**
 * @param {{ body: {
 *     firstName: String,
 *     lastName: String,
 *     birthday: {year, month, day},
 * }}} request
 * @param response
 * @return {Promise.<void>}
 */
exports.edit = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let user = yield index_1.default.user.find({
        where: {
            id: request.body.user.id
        }
    });
    if (user) {
        yield user.update(request.body);
        user.save({ fields: user_1.exposedAttributes });
        response.status(http_status_codes_1.default.OK).end();
    }
    else {
        response.status(http_status_codes_1.default.BAD_REQUEST).end();
    }
});
//# sourceMappingURL=user.js.map