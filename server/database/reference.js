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
// File for setting up node mysql
const mysql = require("mysql");
const Sequelize = require("sequelize");
const config_1 = require("../core/config");
const pool = mysql.createPool({
    host: 'localhost',
    user: config_1.default.mysqlUser,
    password: config_1.default.mysqlPassword,
    database: config_1.default.mysqlDatabase,
    timezone: '+00'
});
// Async connection creation
const asyncConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(connection);
            }
        });
    });
};
exports.newConnection = (logSQL) => __awaiter(this, void 0, void 0, function* () {
    const connection = yield asyncConnection();
    const asyncQuery = (query, values) => {
        if (logSQL) {
            console.log([
                '[SQL Query Start]',
                query,
                '[SQL Query End]'
            ].join('\n'));
        }
        return new Promise((resolve, reject) => {
            if (values) {
                connection.query(query, values, (err, results, fields) => {
                    if (err) {
                        reject(Error(['Unexpected error: ' + err.message, 'Query:', query].join('\n')));
                    }
                    else {
                        resolve(results);
                    }
                });
            }
            else {
                connection.query(query, (err, result, fields) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            }
        });
    };
    return Object.assign({}, connection, { asyncQuery });
});
exports.sequelizeAdmin = new Sequelize(config_1.default.mysqlDatabase, config_1.default.mysqlUser, config_1.default.mysqlPassword, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: '+00:00'
});
//# sourceMappingURL=reference.js.map