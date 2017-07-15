"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Sequelize = require("sequelize");
const config_1 = require("../../core/config");
const reference_1 = require("../reference");
const errors_1 = require("../errors");
exports.attributes = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        set(value) {
            if (value.year && value.month && value.date) {
                this.setDataValue('birthday', new Date(Date.UTC(value.year, value.month, value.date, 12))); // hour = 12 because things are weird when it's set to midnight.
            }
            else {
                this.setDataValue('birthday', value);
            }
        }
    }
};
exports.exposedAttributes = lodash_1.without(Object.keys(exports.attributes), 'id');
const blockIdEdit = (instance) => {
    if (instance.changed('id')) {
        throw new errors_1.ProhibitedEditError('Editing the id PK of users table is prohibited.');
    }
};
const model = reference_1.sequelizeAdmin.define('users', exports.attributes);
model.beforeUpdate(blockIdEdit);
model.sync({ alter: config_1.default.devMode }); // Alter when in development mode
exports.default = model;
//# sourceMappingURL=user.js.map