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
const path = require("path");
const fs = require("fs");
const lodash_1 = require("lodash");
const httpStatus = require("http-status-codes");
const models = require("../../database/models");
const user_1 = require("../../database/models/user");
const errors_1 = require("../../database/errors");
const auth_1 = require("./auth");
const { JWT_EXPIRE } = process.env;
exports.logger = (request, response, next) => {
    console.log(`[${new Date().toUTCString()}]`, 'Request received at', request.originalUrl);
    next();
};
exports.sendIndex = (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../../public/index.html'));
};
exports.checkReview = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    let unfinishedReview = yield models.session.find({
        where: {
            newbie: request.body.user.id,
            rating: null
        }
    });
    if (unfinishedReview) {
        response.status(httpStatus.FORBIDDEN).json({
            reason: 'Review required.',
            session: unfinishedReview.id
        });
        return;
    }
    else {
        next();
    }
});
const errorLogPath = path.resolve(__dirname, '../../errors.log');
// Clear up error log on start
fs.writeFileSync(errorLogPath, '');
exports.logError = (message) => {
    return new Promise(resolve => {
        fs.appendFile(errorLogPath, [message, ''].join('\n'), resolve);
    });
};
// noinspection JSUnusedLocalSymbols
exports.errorHandler = (error, request, response, next) => __awaiter(this, void 0, void 0, function* () {
    if (error instanceof errors_1.ProhibitedEditError) {
        console.warn([
            `[${new Date().toUTCString()}]`,
            `Request at ${request.originalUrl} attempted make a forbidden edit. The request processing has been aborted.`,
            'Details available in error log.'
        ].join('\n'));
        yield exports.logError([
            `[${new Date().toUTCString()}] Blocked edit request:`,
            `Error message: ${error.message}`,
            JSON.stringify(request.body, null, '\t')
        ].join('\n'));
        response.status(httpStatus.FORBIDDEN).end();
    }
    else if (error === 'Request blocked by CORS.') {
        console.warn(`Request at ${request.originalUrl} blocked by CORS.`);
        response.status(httpStatus.BAD_REQUEST).end();
    }
    else {
        const timeStamp = new Date().toUTCString();
        console.error(`[${timeStamp}] Unexpected error when handling request at ${request.originalUrl}\nDetails will be logged to error log.`);
        yield exports.logError([
            `[${timeStamp}] Server handling error!`,
            `Error message:`,
            `${error}`,
            `Request details:`,
            JSON.stringify(request.body, null, '\t')
        ].join('\n'));
        response.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    }
});
exports.endResponse = (request, response) => {
    response.end();
};
/**
 * Note: account.verified indicates whether the account's email has been verified.
 *
 * @param id
 * @param [loadedInstances] Instances that have already been loaded to skip searching the database for the instance.
 * @return {Promise.<Store>}
 */
exports.buildStore = (id, loadedInstances = {}) => __awaiter(this, void 0, void 0, function* () {
    let { user, account } = loadedInstances;
    user = user || (yield models.user.find({
        where: {
            id
        }
    }));
    account = account || (yield models.account.find({
        where: {
            user: id
        }
    }));
    let store = {};
    store.account = lodash_1.pick(account, ['email', 'verified']);
    store.user = lodash_1.pick(user, user_1.exposedAttributes);
    store.session = {
        jwt: auth_1.createSessionToken(id),
        expire: parseInt(JWT_EXPIRE) * 1000
    };
    return store;
});
/**
 * Wraps the handler in a higher order function to catch any error that the handler throws and pass it to express's error handler.
 */
exports.wrapTryCatch = (handler) => (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield handler(request, response, next);
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9taXNjL3V0aWxzLnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvcm91dGVyL21pc2MvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsbUNBQThCO0FBQzlCLGdEQUFnRDtBQUVoRCxnREFBZ0Q7QUFDaEQscURBQStGO0FBQy9GLGtEQUE0RDtBQUM1RCxpQ0FBNEM7QUFNNUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFdEIsUUFBQSxNQUFNLEdBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUk7SUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekYsSUFBSSxFQUFFLENBQUM7QUFDUixDQUFDLENBQUM7QUFFVyxRQUFBLFNBQVMsR0FBWSxDQUFDLE9BQU8sRUFBRSxRQUFRO0lBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUMsQ0FBQztBQUVXLFFBQUEsV0FBVyxHQUFHLENBQU8sT0FBd0IsRUFBRSxRQUFrQixFQUFFLElBQWtCO0lBQ2pHLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNoRCxLQUFLLEVBQUU7WUFDTixNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixNQUFNLEVBQUUsSUFBSTtTQUNaO0tBQ0QsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFD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QUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2IsQ0FBQztBQUNGLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgaHR0cFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5cbmltcG9ydCAqIGFzIG1vZGVscyBmcm9tICcuLi8uLi9kYXRhYmFzZS9tb2RlbHMnO1xuaW1wb3J0IHsgZXhwb3NlZEF0dHJpYnV0ZXMgYXMgdXNlckF0dHJpYnV0ZXMsIFVzZXJJbnN0YW5jZSB9IGZyb20gJy4uLy4uL2RhdGFiYXNlL21vZGVscy91c2VyJztcbmltcG9ydCB7IFByb2hpYml0ZWRFZGl0RXJyb3IgfSBmcm9tICcuLi8uLi9kYXRhYmFzZS9lcnJvcnMnO1xuaW1wb3J0IHsgY3JlYXRlU2Vzc2lvblRva2VuIH0gZnJvbSAnLi9hdXRoJztcbmltcG9ydCB7IEFjY291bnRJbnN0YW5jZSB9IGZyb20gJy4uLy4uL2RhdGFiYXNlL21vZGVscy9hY2NvdW50JztcblxuaW1wb3J0IHsgSGFuZGxlciwgRXJyb3JSZXF1ZXN0SGFuZGxlciwgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgQXN5bmNIYW5kbGVyLCBTdG9yZSwgVmVyaWZpZWRSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5jb25zdCB7IEpXVF9FWFBJUkUgfSA9IHByb2Nlc3MuZW52O1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyOiBIYW5kbGVyID0gKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSA9PiB7XG5cdGNvbnNvbGUubG9nKGBbJHtuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCl9XWAsICdSZXF1ZXN0IHJlY2VpdmVkIGF0JywgcmVxdWVzdC5vcmlnaW5hbFVybCk7XG5cdG5leHQoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZW5kSW5kZXg6IEhhbmRsZXIgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcblx0cmVzcG9uc2Uuc2VuZEZpbGUocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL3B1YmxpYy9pbmRleC5odG1sJykpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrUmV2aWV3ID0gYXN5bmMgKHJlcXVlc3Q6IFZlcmlmaWVkUmVxdWVzdCwgcmVzcG9uc2U6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcblx0bGV0IHVuZmluaXNoZWRSZXZpZXcgPSBhd2FpdCBtb2RlbHMuc2Vzc2lvbi5maW5kKHtcblx0XHR3aGVyZToge1xuXHRcdFx0bmV3YmllOiByZXF1ZXN0LmJvZHkudXNlci5pZCxcblx0XHRcdHJhdGluZzogbnVsbFxuXHRcdH1cblx0fSk7XG5cdFxuXHRpZiAodW5maW5pc2hlZFJldmlldykge1xuXHRcdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLkZPUkJJRERFTikuanNvbih7XG5cdFx0XHRyZWFzb246ICdSZXZpZXcgcmVxdWlyZWQuJyxcblx0XHRcdHNlc3Npb246IHVuZmluaXNoZWRSZXZpZXcuaWRcblx0XHR9KTtcblx0XHRyZXR1cm47XG5cdH1cblx0ZWxzZSB7XG5cdFx0bmV4dCgpO1xuXHR9XG59O1xuXG5jb25zdCBlcnJvckxvZ1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vZXJyb3JzLmxvZycpO1xuLy8gQ2xlYXIgdXAgZXJyb3IgbG9nIG9uIHN0YXJ0XG5mcy53cml0ZUZpbGVTeW5jKGVycm9yTG9nUGF0aCwgJycpO1xuXG5leHBvcnQgY29uc3QgbG9nRXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdGZzLmFwcGVuZEZpbGUoZXJyb3JMb2dQYXRoLCBbbWVzc2FnZSwgJyddLmpvaW4oJ1xcbicpLCByZXNvbHZlKTtcblx0fSk7XG59O1xuXG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjb25zdCBlcnJvckhhbmRsZXI6IEVycm9yUmVxdWVzdEhhbmRsZXIgPSBhc3luYyAoZXJyb3I6IEVycm9yIHwgc3RyaW5nLCByZXF1ZXN0LCByZXNwb25zZSwgbmV4dCkgPT4ge1xuXHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBQcm9oaWJpdGVkRWRpdEVycm9yKSB7XG5cdFx0Y29uc29sZS53YXJuKFtcblx0XHRcdGBbJHtuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCl9XWAsXG5cdFx0XHRgUmVxdWVzdCBhdCAke3JlcXVlc3Qub3JpZ2luYWxVcmx9IGF0dGVtcHRlZCBtYWtlIGEgZm9yYmlkZGVuIGVkaXQuIFRoZSByZXF1ZXN0IHByb2Nlc3NpbmcgaGFzIGJlZW4gYWJvcnRlZC5gLFxuXHRcdFx0J0RldGFpbHMgYXZhaWxhYmxlIGluIGVycm9yIGxvZy4nXG5cdFx0XS5qb2luKCdcXG4nKSk7XG5cdFx0YXdhaXQgbG9nRXJyb3IoW1xuXHRcdFx0YFske25ldyBEYXRlKCkudG9VVENTdHJpbmcoKX1dIEJsb2NrZWQgZWRpdCByZXF1ZXN0OmAsXG5cdFx0XHRgRXJyb3IgbWVzc2FnZTogJHtlcnJvci5tZXNzYWdlfWAsXG5cdFx0XHRKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHksIG51bGwsICdcXHQnKVxuXHRcdF0uam9pbignXFxuJykpO1xuXHRcdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLkZPUkJJRERFTikuZW5kKCk7XG5cdFx0XG5cdH1cblx0ZWxzZSBpZiAoZXJyb3IgPT09ICdSZXF1ZXN0IGJsb2NrZWQgYnkgQ09SUy4nKSB7XG5cdFx0Y29uc29sZS53YXJuKGBSZXF1ZXN0IGF0ICR7cmVxdWVzdC5vcmlnaW5hbFVybH0gYmxvY2tlZCBieSBDT1JTLmApO1xuXHRcdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLkJBRF9SRVFVRVNUKS5lbmQoKTtcblx0fVxuXHRlbHNlIHtcblx0XHRjb25zdCB0aW1lU3RhbXA6IHN0cmluZyA9IG5ldyBEYXRlKCkudG9VVENTdHJpbmcoKTtcblx0XHRjb25zb2xlLmVycm9yKGBbJHt0aW1lU3RhbXB9XSBVbmV4cGVjdGVkIGVycm9yIHdoZW4gaGFuZGxpbmcgcmVxdWVzdCBhdCAke3JlcXVlc3Qub3JpZ2luYWxVcmx9XFxuRGV0YWlscyB3aWxsIGJlIGxvZ2dlZCB0byBlcnJvciBsb2cuYCk7XG5cdFx0YXdhaXQgbG9nRXJyb3IoW1xuXHRcdFx0YFske3RpbWVTdGFtcH1dIFNlcnZlciBoYW5kbGluZyBlcnJvciFgLFxuXHRcdFx0YEVycm9yIG1lc3NhZ2U6YCxcblx0XHRcdGAke2Vycm9yfWAsXG5cdFx0XHRgUmVxdWVzdCBkZXRhaWxzOmAsXG5cdFx0XHRKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHksIG51bGwsICdcXHQnKVxuXHRcdF0uam9pbignXFxuJykpO1xuXHRcdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUikuZW5kKCk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBlbmRSZXNwb25zZTogSGFuZGxlciA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuXHRyZXNwb25zZS5lbmQoKTtcbn07XG5cbmludGVyZmFjZSBMb2FkZWRNb2RlbHMge1xuXHR1c2VyPzogVXNlckluc3RhbmNlO1xuXHRhY2NvdW50PzogQWNjb3VudEluc3RhbmNlO1xufVxuXG4vKipcbiAqIE5vdGU6IGFjY291bnQudmVyaWZpZWQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGFjY291bnQncyBlbWFpbCBoYXMgYmVlbiB2ZXJpZmllZC5cbiAqXG4gKiBAcGFyYW0gaWRcbiAqIEBwYXJhbSBbbG9hZGVkSW5zdGFuY2VzXSBJbnN0YW5jZXMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBsb2FkZWQgdG8gc2tpcCBzZWFyY2hpbmcgdGhlIGRhdGFiYXNlIGZvciB0aGUgaW5zdGFuY2UuXG4gKiBAcmV0dXJuIHtQcm9taXNlLjxTdG9yZT59XG4gKi9cbmV4cG9ydCBjb25zdCBidWlsZFN0b3JlID0gYXN5bmMgKGlkOiBzdHJpbmcsIGxvYWRlZEluc3RhbmNlczogTG9hZGVkTW9kZWxzID0ge30pOiBQcm9taXNlPFN0b3JlPiA9PiB7XG5cdGxldCB7IHVzZXIsIGFjY291bnQgfSA9IGxvYWRlZEluc3RhbmNlcztcblx0dXNlciA9IHVzZXIgfHwgYXdhaXQgbW9kZWxzLnVzZXIuZmluZCh7XG5cdFx0d2hlcmU6IHtcblx0XHRcdGlkXG5cdFx0fVxuXHR9KTtcblx0YWNjb3VudCA9IGFjY291bnQgfHwgYXdhaXQgbW9kZWxzLmFjY291bnQuZmluZCh7XG5cdFx0d2hlcmU6IHtcblx0XHRcdHVzZXI6IGlkXG5cdFx0fVxuXHR9KTtcblx0XG5cdGxldCBzdG9yZTogYW55ID0ge307XG5cdFxuXHRzdG9yZS5hY2NvdW50ID0gcGljayhhY2NvdW50LCBbJ2VtYWlsJywgJ3ZlcmlmaWVkJ10pO1xuXHRzdG9yZS51c2VyID0gcGljayh1c2VyLCB1c2VyQXR0cmlidXRlcyk7XG5cdHN0b3JlLnNlc3Npb24gPSB7XG5cdFx0and0OiBjcmVhdGVTZXNzaW9uVG9rZW4oaWQpLFxuXHRcdGV4cGlyZTogcGFyc2VJbnQoSldUX0VYUElSRSkgKiAxMDAwXG5cdH07XG5cdFxuXHRyZXR1cm4gc3RvcmUgYXMgU3RvcmU7XG59O1xuXG4vKipcbiAqIFdyYXBzIHRoZSBoYW5kbGVyIGluIGEgaGlnaGVyIG9yZGVyIGZ1bmN0aW9uIHRvIGNhdGNoIGFueSBlcnJvciB0aGF0IHRoZSBoYW5kbGVyIHRocm93cyBhbmQgcGFzcyBpdCB0byBleHByZXNzJ3MgZXJyb3IgaGFuZGxlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHdyYXBUcnlDYXRjaCA9IChoYW5kbGVyOiBBc3luY0hhbmRsZXI8UmVxdWVzdD4pOiBBc3luY0hhbmRsZXI8UmVxdWVzdD4gPT4gYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgaGFuZGxlcihyZXF1ZXN0LCByZXNwb25zZSwgbmV4dCk7XG5cdH1cblx0Y2F0Y2ggKGVycm9yKSB7XG5cdFx0bmV4dChlcnJvcik7XG5cdH1cbn07XG4iXX0=