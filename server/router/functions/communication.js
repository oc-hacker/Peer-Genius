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
const models = require("../../database/models");
const communication_1 = require("../../database/models/communication");
exports.getMethods = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).json({
        methods: communication_1.communicationMethods
    });
});
exports.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let communication = yield models.communication.find({
        where: {
            user: request.body.user.id
        }
    });
    let updated = Object.assign({
        whatsapp: null,
        hangouts: null,
        messenger: null,
        imessage: null,
        skype: null,
        viber: null,
        tango: null,
        aim: null,
        oovoo: null
    }, request.body);
    yield communication.update(lodash_1.omit(request.body, ['user']));
    yield communication.save();
    response.status(httpStatus.OK).end();
});
//# sourceMappingURL=communication.js.map