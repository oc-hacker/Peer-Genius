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
const Sequelize = require("sequelize");
const randomstring = require("randomstring");
const config_1 = require("../../core/config");
const reference_1 = require("../reference");
const user_1 = require("./user");
const errors_1 = require("../errors");
const attributes = {
    user: {
        type: Sequelize.UUID,
        references: {
            model: user_1.default,
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        primaryKey: true,
    },
    verifyEmailKey: {
        type: Sequelize.CHAR(32),
        allowNull: true,
        unique: true
    },
    nextEmail: {
        type: Sequelize.STRING,
        allowNull: true
    }
};
const blockUserEdit = (instance) => {
    if (instance.changed('user')) {
        throw new errors_1.ProhibitedEditError('Editing the user FK of keys table is prohibited.');
    }
};
const model = reference_1.sequelizeAdmin.define('keys', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({ alter: config_1.default.devMode }); // Alter when in development mode
// Extra utility methods
/**
 * Generates a key that is guaranteed to be unique for the specified field.
 * TODO test the method
 * @param column The column of the database to generate the key for. It should be a CHAR(32) column.
 * @return {Promise.<string>}
 */
exports.uniqueRandom = (column) => __awaiter(this, void 0, void 0, function* () {
    let key;
    do {
        key = randomstring.generate();
    } while ((yield model.find({ where: { [column]: key } })));
    return key;
});
exports.default = model;
//# sourceMappingURL=key.js.map