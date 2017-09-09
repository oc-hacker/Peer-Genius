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
const { DB_NAME, DB_ADMIN_USER, DB_ADMIN_PASS, DB_SLACK_USER, DB_SLACK_PASS } = process.env;
// Promise-based connection creation
const getConnection = (pool) => {
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
const adminPool = mysql.createPool({
    host: 'localhost',
    database: DB_NAME,
    user: DB_ADMIN_USER,
    password: DB_ADMIN_PASS,
    timezone: '+00'
});
exports.newConnection = (logSQL) => __awaiter(this, void 0, void 0, function* () {
    const connection = yield getConnection(adminPool);
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
                connection.query(query, values, (err, result, fields) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
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
const slackPool = mysql.createPool({
    host: 'localhost',
    database: DB_NAME,
    user: DB_SLACK_USER,
    password: DB_SLACK_PASS,
    timezone: '+00'
});
exports.slackConnection = () => __awaiter(this, void 0, void 0, function* () {
    const connection = yield getConnection(slackPool);
    const asyncQuery = (query) => {
        return new Promise((resolve, reject) => {
            connection.query(query, (err, result, fields) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    return Object.assign({}, connection, { asyncQuery });
});
exports.sequelizeAdmin = new Sequelize(DB_NAME, DB_ADMIN_USER, DB_ADMIN_PASS, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    timezone: '+00:00'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL2RhdGFiYXNlL3JlZmVyZW5jZS50cyIsInNvdXJjZXMiOlsiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL2RhdGFiYXNlL3JlZmVyZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBQ2pDLCtCQUErQjtBQUUvQix1Q0FBdUM7QUFFdkMsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBYzVGLG9DQUFvQztBQUNwQyxNQUFNLGFBQWEsR0FBRyxDQUFDLElBQWlCO0lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVTtZQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNmLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDTCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ2xDLElBQUksRUFBRSxXQUFXO0lBQ2pCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLElBQUksRUFBRSxhQUFhO0lBQ25CLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLFFBQVEsRUFBRSxLQUFLO0NBQ2YsQ0FBQyxDQUFDO0FBRVUsUUFBQSxhQUFhLEdBQXNCLENBQU8sTUFBZ0I7SUFDdEUsTUFBTSxVQUFVLEdBQXNCLE1BQU0sYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBYSxFQUFFLE1BQVk7UUFDOUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ1gsbUJBQW1CO2dCQUNuQixLQUFLO2dCQUNMLGlCQUFpQjthQUNqQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNO29CQUNuRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDYixDQUFDO29CQUNELElBQUksQ0FBQyxDQUFDO3dCQUNMLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDTCxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTTtvQkFDM0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2IsQ0FBQztvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDTCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRixNQUFNLG1CQUNGLFVBQVUsSUFDYixVQUFVLElBQ1Q7QUFDSCxDQUFDLENBQUEsQ0FBQztBQUVGLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDbEMsSUFBSSxFQUFFLFdBQVc7SUFDakIsUUFBUSxFQUFFLE9BQU87SUFDakIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsUUFBUSxFQUFFLGFBQWE7SUFDdkIsUUFBUSxFQUFFLEtBQUs7Q0FDZixDQUFDLENBQUM7QUFFVSxRQUFBLGVBQWUsR0FBc0I7SUFDakQsTUFBTSxVQUFVLEdBQXNCLE1BQU0sYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBYTtRQUNoQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNsQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTTtnQkFDM0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDTCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsTUFBTSxtQkFDRixVQUFVLElBQ2IsVUFBVSxJQUNUO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBd0IsSUFBSSxTQUFTLENBQy9ELE9BQU8sRUFDUCxhQUFhLEVBQ2IsYUFBYSxFQUNiO0lBQ0MsSUFBSSxFQUFFLFdBQVc7SUFDakIsT0FBTyxFQUFFLE9BQU87SUFDaEIsT0FBTyxFQUFFLEtBQUs7SUFDZCxRQUFRLEVBQUUsUUFBUTtDQUNsQixDQUNELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlIGZvciBzZXR0aW5nIHVwIG5vZGUgbXlzcWxcbmltcG9ydCAqIGFzIG15c3FsIGZyb20gJ215c3FsJztcbmltcG9ydCBSb3dEYXRhIGZyb20gJ215c3FsL2xpYi9wcm90b2NvbC9wYWNrZXRzL1Jvd0RhdGFQYWNrZXQnO1xuaW1wb3J0ICogYXMgU2VxdWVsaXplIGZyb20gJ3NlcXVlbGl6ZSc7XG5cbmNvbnN0IHsgREJfTkFNRSwgREJfQURNSU5fVVNFUiwgREJfQURNSU5fUEFTUywgREJfU0xBQ0tfVVNFUiwgREJfU0xBQ0tfUEFTUyB9ID0gcHJvY2Vzcy5lbnY7XG5cbmludGVyZmFjZSBRdWVyeVJlc3VsdHMgZXh0ZW5kcyBBcnJheTxSb3dEYXRhPiB7XG5cdGFmZmVjdGVkUm93czogbnVtYmVyO1xuXHRjaGFuZ2VkUm93czogbnVtYmVyO1xuXHR0aHJlYWRJZDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFzeW5jQ29ubmVjdGlvbiBleHRlbmRzIG15c3FsLklDb25uZWN0aW9uIHtcblx0YXN5bmNRdWVyeTogKHF1ZXJ5OiBzdHJpbmcsIHZhbHVlcz86IGFueSkgPT4gUHJvbWlzZTxRdWVyeVJlc3VsdHM+O1xufVxuXG50eXBlIENvbm5lY3Rpb25GYWN0b3J5ID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPEFzeW5jQ29ubmVjdGlvbj47XG5cbi8vIFByb21pc2UtYmFzZWQgY29ubmVjdGlvbiBjcmVhdGlvblxuY29uc3QgZ2V0Q29ubmVjdGlvbiA9IChwb29sOiBteXNxbC5JUG9vbCk6IFByb21pc2U8bXlzcWwuSUNvbm5lY3Rpb24+ID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRwb29sLmdldENvbm5lY3Rpb24oKGVycm9yLCBjb25uZWN0aW9uKSA9PiB7XG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXNvbHZlKGNvbm5lY3Rpb24pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn07XG5cbmNvbnN0IGFkbWluUG9vbCA9IG15c3FsLmNyZWF0ZVBvb2woe1xuXHRob3N0OiAnbG9jYWxob3N0Jyxcblx0ZGF0YWJhc2U6IERCX05BTUUsXG5cdHVzZXI6IERCX0FETUlOX1VTRVIsXG5cdHBhc3N3b3JkOiBEQl9BRE1JTl9QQVNTLFxuXHR0aW1lem9uZTogJyswMCdcbn0pO1xuXG5leHBvcnQgY29uc3QgbmV3Q29ubmVjdGlvbjogQ29ubmVjdGlvbkZhY3RvcnkgPSBhc3luYyAobG9nU1FMPzogYm9vbGVhbikgPT4ge1xuXHRjb25zdCBjb25uZWN0aW9uOiBteXNxbC5JQ29ubmVjdGlvbiA9IGF3YWl0IGdldENvbm5lY3Rpb24oYWRtaW5Qb29sKTtcblx0XG5cdGNvbnN0IGFzeW5jUXVlcnkgPSAocXVlcnk6IHN0cmluZywgdmFsdWVzPzogYW55KTogUHJvbWlzZTxRdWVyeVJlc3VsdHM+ID0+IHtcblx0XHRpZiAobG9nU1FMKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhbXG5cdFx0XHRcdCdbU1FMIFF1ZXJ5IFN0YXJ0XScsXG5cdFx0XHRcdHF1ZXJ5LFxuXHRcdFx0XHQnW1NRTCBRdWVyeSBFbmRdJ1xuXHRcdFx0XS5qb2luKCdcXG4nKSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRpZiAodmFsdWVzKSB7XG5cdFx0XHRcdGNvbm5lY3Rpb24ucXVlcnkocXVlcnksIHZhbHVlcywgKGVyciwgcmVzdWx0LCBmaWVsZHMpID0+IHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHF1ZXJ5LCAoZXJyLCByZXN1bHQsIGZpZWxkcykgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRcblx0cmV0dXJuIHtcblx0XHQuLi5jb25uZWN0aW9uLFxuXHRcdGFzeW5jUXVlcnlcblx0fTtcbn07XG5cbmNvbnN0IHNsYWNrUG9vbCA9IG15c3FsLmNyZWF0ZVBvb2woe1xuXHRob3N0OiAnbG9jYWxob3N0Jyxcblx0ZGF0YWJhc2U6IERCX05BTUUsXG5cdHVzZXI6IERCX1NMQUNLX1VTRVIsXG5cdHBhc3N3b3JkOiBEQl9TTEFDS19QQVNTLFxuXHR0aW1lem9uZTogJyswMCdcbn0pO1xuXG5leHBvcnQgY29uc3Qgc2xhY2tDb25uZWN0aW9uOiBDb25uZWN0aW9uRmFjdG9yeSA9IGFzeW5jICgpID0+IHtcblx0Y29uc3QgY29ubmVjdGlvbjogbXlzcWwuSUNvbm5lY3Rpb24gPSBhd2FpdCBnZXRDb25uZWN0aW9uKHNsYWNrUG9vbCk7XG5cdFxuXHRjb25zdCBhc3luY1F1ZXJ5ID0gKHF1ZXJ5OiBzdHJpbmcpOiBQcm9taXNlPFF1ZXJ5UmVzdWx0cz4gPT4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHF1ZXJ5LCAoZXJyLCByZXN1bHQsIGZpZWxkcykgPT4ge1xuXHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblx0XG5cdHJldHVybiB7XG5cdFx0Li4uY29ubmVjdGlvbixcblx0XHRhc3luY1F1ZXJ5XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VxdWVsaXplQWRtaW46IFNlcXVlbGl6ZS5TZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKFxuXHREQl9OQU1FLFxuXHREQl9BRE1JTl9VU0VSLFxuXHREQl9BRE1JTl9QQVNTLFxuXHR7XG5cdFx0aG9zdDogJzEyNy4wLjAuMScsXG5cdFx0ZGlhbGVjdDogJ215c3FsJyxcblx0XHRsb2dnaW5nOiBmYWxzZSxcblx0XHR0aW1lem9uZTogJyswMDowMCdcblx0fVxuKTtcbiJdfQ==