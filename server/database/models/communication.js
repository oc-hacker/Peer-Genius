"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Sequelize = require("sequelize");
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
    // If null, the user is not using this communication method. If set, the value points to the user's account in that app.
    whatsapp: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    hangouts: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    messenger: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    imessage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    skype: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    viber: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    tango: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    aim: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    oovoo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
};
exports.communicationMethods = lodash_1.without(Object.keys(attributes), 'user');
const blockUserEdit = (instance) => {
    if (instance.changed('user')) {
        throw new errors_1.ProhibitedEditError('Editing the user FK of accounts table is prohibited.');
    }
};
/** @typedef {Model} */
const model = reference_1.sequelizeAdmin.define('communications', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({ alter: config_1.default.devMode }); // Alter when in development mode
exports.default = model;
//# sourceMappingURL=communication.js.map