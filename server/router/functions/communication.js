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
/**
 * @param request
 * @param {Object.<string, boolean>} request.body.methods An object of boolean values describing which methods are preferred
 * @param response
 * @return {Promise.<void>}
 */
exports.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
    // for (let method of communicationMethods) {
    // 	if (request.body.methods[method]) {
    // 		models.communication.findOrCreate({
    // 			where: {
    // 				user: request.body.user.id
    // 			},
    // 			defaults: {
    // 				method
    // 			}
    // 		});
    // 	}
    // 	else {
    // 		models.communication.find({
    // 			where: {
    // 				user: request.body.user.id,
    // 				method
    // 			}
    // 		}).then(row => {
    // 			if (row) {
    // 				row.destroy();
    // 			}
    // 		})
    // 	}
    // }
    let communication = yield index_1.default.communication.find({
        where: {
            user: request.body.user.id
        }
    });
    yield communication.update(_.omit(request.body, 'user'));
    yield communication.save();
    response.status(http_status_codes_1.default.OK).end();
});
//# sourceMappingURL=communication.js.map