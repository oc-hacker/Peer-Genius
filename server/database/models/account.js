"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const argon2_1 = require("argon2");
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
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value);
            this.setDataValue('verified', false);
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};
const blockUserEdit = (instance) => {
    if (instance.changed('user')) {
        throw new errors_1.ProhibitedEditError('Editing the user FK of accounts table is prohibited.');
    }
};
const hashPassword = (instance) => {
    if (instance.changed('password')) {
        return argon2_1.hash(instance.password).then(hash => instance.password = hash);
    }
};
const model = reference_1.sequelizeAdmin.define('accounts', attributes);
model.beforeCreate(hashPassword);
model.beforeUpdate('blockUserEdit', blockUserEdit);
model.beforeUpdate('hashPassword', hashPassword);
model.sync({ alter: config_1.default.devMode }); // Alter when in development mode
exports.default = model;
//# sourceMappingURL=account.js.map