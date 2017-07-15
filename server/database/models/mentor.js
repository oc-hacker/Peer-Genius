"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const errors_1 = require("../errors");
const config_1 = require("../../core/config");
const reference_1 = require("../reference");
const user_1 = require("./user");
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
    // The following indicate whether the user can teach the following subjects.
    biology: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    geometry: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    algebra2: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    spanish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
};
const blockUserEdit = (instance) => {
    if (instance.changed('user')) {
        throw new errors_1.ProhibitedEditError('Editing the user FK of mentors table is prohibited.');
    }
};
const model = reference_1.sequelizeAdmin.define('mentors', attributes);
model.beforeUpdate(blockUserEdit);
model.sync({ alter: config_1.default.devMode }); // Alter when in development mode
exports.default = model;
//# sourceMappingURL=mentor.js.map