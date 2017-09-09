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
const argon2 = require("argon2");
const utils_1 = require("../misc/utils");
const models = require("../../database/models");
const key_1 = require("../../database/models/key");
const user_1 = require("../../database/models/user");
const reference_1 = require("../../database/reference");
const { SLACK_TOKEN, NODE_ENV } = process.env;
// Note: only use next() if you are not handling the request!
/**
 * Used for letting the client retrieve server configuration information.
 */
exports.getConfig = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).json({
        devMode: NODE_ENV === 'dev'
    });
});
/**
 * Response:
 * OK - account creation successful. An initial store will be sent. See <code>Store</code> interface defined in <code>server/types.ts</code> for details.
 * CONFLICT - email already used
 */
exports.createAccount = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield models.account.find({
        where: {
            email: request.body.email
        }
    });
    if (account) {
        // Email already exists.
        response.status(httpStatus.CONFLICT).end();
    }
    else {
        // OK
        let user = yield models.user.create(lodash_1.pick(request.body, user_1.exposedAttributes));
        let account = yield models.account.create({
            user: user.id,
            email: request.body.email,
            password: request.body.password
        });
        let store = yield utils_1.buildStore(user.id, { user, account });
        response.status(httpStatus.OK).json(store);
        let key = yield key_1.uniqueRandom('verifyEmailKey');
        // TODO send email
    }
});
/**
 * Response:
 * OK - login successful. An initial store will be sent. See <code>Store</code> interface defined in <code>server/types.ts</code> for details.
 * UNAUTHORIZED - bad email or password
 */
exports.verifyLogin = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield models.account.find({
        where: {
            email: request.body.email
        }
    });
    if (account && (yield argon2.verify(account.password, request.body.password))) {
        response.status(httpStatus.OK).json(yield utils_1.buildStore(account.user, { account }));
    }
    else {
        response.status(httpStatus.UNAUTHORIZED).end();
    }
});
/**
 * Checks whether an email is in use.
 * Response:
 * OK - the request will always be OK. Field <code>taken</code> in response body will indicate whether the email has been taken.
 */
exports.checkEmail = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let account = yield models.account.find({
        where: {
            email: request.body.email
        }
    });
    response.status(httpStatus.OK).json({ taken: !!account });
});
exports._db = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let { token, command, text } = request.body;
    if (token === SLACK_TOKEN) {
        try {
            // Parse command
            let flags = text.match(/--\S+/g).map(flag => flag.substring(2));
            let command = text.replace(/--\S+/g, '').replace(/\s+/g, ' ');
            let [mode, ...rest] = command.split(' ');
            let mainCommand = rest.join(' ');
            // Establish connection
            let connection = yield reference_1.slackConnection();
            let results;
            switch (mode.toLowerCase()) {
                case 'overview': {
                    // language=MYSQL-SQL
                    results = yield connection.asyncQuery(`SELECT COUNT(*) AS totalCount FROM users`);
                    let totalCount = results[0].totalCount;
                    // language=MYSQL-SQL
                    results = yield connection.asyncQuery(`SELECT COUNT(*) AS guruCount FROM users INNER JOIN gurus ON gurus.user = users.id`);
                    let guruCount = results[0].guruCount;
                    response.status(httpStatus.OK).json({
                        text: `There are ${totalCount} registered users at Peer Genius, of which ${guruCount} can be gurus.`
                    });
                }
            }
            connection.release();
        }
        catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
        }
    }
    else {
        response.status(httpStatus.UNAUTHORIZED).end();
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9mdW5jdGlvbnMvYXBpLnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvcm91dGVyL2Z1bmN0aW9ucy9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUE4QjtBQUM5QixnREFBZ0Q7QUFDaEQsaUNBQWlDO0FBRWpDLHlDQUEyQztBQUMzQyxnREFBZ0Q7QUFDaEQsbURBQTRFO0FBQzVFLHFEQUFpRjtBQUlqRix3REFBMkQ7QUFFM0QsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRTlDLDZEQUE2RDtBQUU3RDs7R0FFRztBQUNVLFFBQUEsU0FBUyxHQUEwQixDQUFPLE9BQU8sRUFBRSxRQUFRO0lBQ3ZFLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQyxPQUFPLEVBQUUsUUFBUSxLQUFLLEtBQUs7S0FDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUM7QUEyQkY7Ozs7R0FJRztBQUNVLFFBQUEsYUFBYSxHQUF1QyxDQUFPLE9BQU8sRUFBRSxRQUFRO0lBQ3hGLElBQUksT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDdkMsS0FBSyxFQUFFO1lBQ04sS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSztTQUN6QjtLQUNELENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDYix3QkFBd0I7UUFDeEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1AsS0FBSztRQUNM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QyxDQUFDO1FBQ25FLENBQUM7SUFDRixDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDTCxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0FBQ0YsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwaWNrIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIGh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0ICogYXMgYXJnb24yIGZyb20gJ2FyZ29uMic7XG5cbmltcG9ydCB7IGJ1aWxkU3RvcmUgfSBmcm9tICcuLi9taXNjL3V0aWxzJztcbmltcG9ydCAqIGFzIG1vZGVscyBmcm9tICcuLi8uLi9kYXRhYmFzZS9tb2RlbHMnO1xuaW1wb3J0IHsgdW5pcXVlUmFuZG9tIGFzIHVuaXF1ZVJhbmRvbUtleSB9IGZyb20gJy4uLy4uL2RhdGFiYXNlL21vZGVscy9rZXknO1xuaW1wb3J0IHsgZXhwb3NlZEF0dHJpYnV0ZXMgYXMgdXNlckF0dHJpYnV0ZXMgfSBmcm9tICcuLi8uLi9kYXRhYmFzZS9tb2RlbHMvdXNlcic7XG5cbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IEFzeW5jSGFuZGxlciwgU3RvcmUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBzbGFja0Nvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9kYXRhYmFzZS9yZWZlcmVuY2UnO1xuXG5jb25zdCB7IFNMQUNLX1RPS0VOLCBOT0RFX0VOViB9ID0gcHJvY2Vzcy5lbnY7XG5cbi8vIE5vdGU6IG9ubHkgdXNlIG5leHQoKSBpZiB5b3UgYXJlIG5vdCBoYW5kbGluZyB0aGUgcmVxdWVzdCFcblxuLyoqXG4gKiBVc2VkIGZvciBsZXR0aW5nIHRoZSBjbGllbnQgcmV0cmlldmUgc2VydmVyIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb25maWc6IEFzeW5jSGFuZGxlcjxSZXF1ZXN0PiA9IGFzeW5jIChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuXHRyZXNwb25zZS5zdGF0dXMoaHR0cFN0YXR1cy5PSykuanNvbih7XG5cdFx0ZGV2TW9kZTogTk9ERV9FTlYgPT09ICdkZXYnXG5cdH0pO1xufTtcblxuaW50ZXJmYWNlIENyZWF0ZUFjY291bnRSZXF1ZXN0IGV4dGVuZHMgUmVxdWVzdCB7XG5cdGJvZHk6IHtcblx0XHRlbWFpbDogc3RyaW5nO1xuXHRcdHBhc3N3b3JkOiBzdHJpbmc7XG5cdFx0Zmlyc3ROYW1lOiBzdHJpbmc7XG5cdFx0bGFzdE5hbWU6IHN0cmluZztcblx0XHRiaXJ0aGRheToge1xuXHRcdFx0eWVhcjogbnVtYmVyO1xuXHRcdFx0bW9udGg6IG51bWJlcjtcblx0XHRcdGRheTogbnVtYmVyO1xuXHRcdH1cblx0XHRjb21tdW5pY2F0aW9uOiB7XG5cdFx0XHRza3lwZT86IHN0cmluZztcblx0XHRcdGhhbmdvdXRzPzogc3RyaW5nO1xuXHRcdFx0bWVzc2VuZ2VyPzogc3RyaW5nO1xuXHRcdFx0aW1lc3NhZ2U/OiBzdHJpbmc7XG5cdFx0XHR3aGF0c2FwcD86IHN0cmluZztcblx0XHRcdHZpYmVyPzogc3RyaW5nO1xuXHRcdFx0dGFuZ28/OiBzdHJpbmc7XG5cdFx0XHRhaW0/OiBzdHJpbmc7XG5cdFx0XHRvb3Zvbz86IHN0cmluZztcblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogUmVzcG9uc2U6XG4gKiBPSyAtIGFjY291bnQgY3JlYXRpb24gc3VjY2Vzc2Z1bC4gQW4gaW5pdGlhbCBzdG9yZSB3aWxsIGJlIHNlbnQuIFNlZSA8Y29kZT5TdG9yZTwvY29kZT4gaW50ZXJmYWNlIGRlZmluZWQgaW4gPGNvZGU+c2VydmVyL3R5cGVzLnRzPC9jb2RlPiBmb3IgZGV0YWlscy5cbiAqIENPTkZMSUNUIC0gZW1haWwgYWxyZWFkeSB1c2VkXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVBY2NvdW50OiBBc3luY0hhbmRsZXI8Q3JlYXRlQWNjb3VudFJlcXVlc3Q+ID0gYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG5cdGxldCBhY2NvdW50ID0gYXdhaXQgbW9kZWxzLmFjY291bnQuZmluZCh7XG5cdFx0d2hlcmU6IHtcblx0XHRcdGVtYWlsOiByZXF1ZXN0LmJvZHkuZW1haWxcblx0XHR9XG5cdH0pO1xuXHRcblx0aWYgKGFjY291bnQpIHtcblx0XHQvLyBFbWFpbCBhbHJlYWR5IGV4aXN0cy5cblx0XHRyZXNwb25zZS5zdGF0dXMoaHR0cFN0YXR1cy5DT05GTElDVCkuZW5kKCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gT0tcblx0XHRsZXQgdXNlciA9IGF3YWl0IG1vZGVscy51c2VyLmNyZWF0ZShwaWNrKHJlcXVlc3QuYm9keSwgdXNlckF0dHJpYnV0ZXMpKTtcblx0XHRsZXQgYWNjb3VudCA9IGF3YWl0IG1vZGVscy5hY2NvdW50LmNyZWF0ZSh7XG5cdFx0XHR1c2VyOiB1c2VyLmlkLFxuXHRcdFx0ZW1haWw6IHJlcXVlc3QuYm9keS5lbWFpbCxcblx0XHRcdHBhc3N3b3JkOiByZXF1ZXN0LmJvZHkucGFzc3dvcmRcblx0XHR9KTtcblx0XHRcblx0XHRsZXQgc3RvcmU6IFN0b3JlID0gYXdhaXQgYnVpbGRTdG9yZSh1c2VyLmlkLCB7IHVzZXIsIGFjY291bnQgfSk7XG5cdFx0XG5cdFx0cmVzcG9uc2Uuc3RhdHVzKGh0dHBTdGF0dXMuT0spLmpzb24oc3RvcmUpO1xuXHRcdGxldCBrZXkgPSBhd2FpdCB1bmlxdWVSYW5kb21LZXkoJ3ZlcmlmeUVtYWlsS2V5Jyk7XG5cdFx0Ly8gVE9ETyBzZW5kIGVtYWlsXG5cdH1cbn07XG5cbmludGVyZmFjZSBMb2dpblJlcXVlc3QgZXh0ZW5kcyBSZXF1ZXN0IHtcblx0Ym9keToge1xuXHRcdGVtYWlsOiBzdHJpbmc7XG5cdFx0cGFzc3dvcmQ6IHN0cmluZztcblx0fTtcbn1cblxuLyoqXG4gKiBSZXNwb25zZTpcbiAqIE9LIC0gbG9naW4gc3VjY2Vzc2Z1bC4gQW4gaW5pdGlhbCBzdG9yZSB3aWxsIGJlIHNlbnQuIFNlZSA8Y29kZT5TdG9yZTwvY29kZT4gaW50ZXJmYWNlIGRlZmluZWQgaW4gPGNvZGU+c2VydmVyL3R5cGVzLnRzPC9jb2RlPiBmb3IgZGV0YWlscy5cbiAqIFVOQVVUSE9SSVpFRCAtIGJhZCBlbWFpbCBvciBwYXNzd29yZFxuICovXG5leHBvcnQgY29uc3QgdmVyaWZ5TG9naW46IEFzeW5jSGFuZGxlcjxMb2dpblJlcXVlc3Q+ID0gYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG5cdGxldCBhY2NvdW50ID0gYXdhaXQgbW9kZWxzLmFjY291bnQuZmluZCh7XG5cdFx0d2hlcmU6IHtcblx0XHRcdGVtYWlsOiByZXF1ZXN0LmJvZHkuZW1haWxcblx0XHR9XG5cdH0pO1xuXHRcblx0aWYgKGFjY291bnQgJiYgYXdhaXQgYXJnb24yLnZlcmlmeShhY2NvdW50LnBhc3N3b3JkLCByZXF1ZXN0LmJvZHkucGFzc3dvcmQpKSB7XG5cdFx0cmVzcG9uc2Uuc3RhdHVzKGh0dHBTdGF0dXMuT0spLmpzb24oYXdhaXQgYnVpbGRTdG9yZShhY2NvdW50LnVzZXIsIHsgYWNjb3VudCB9KSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0cmVzcG9uc2Uuc3RhdHVzKGh0dHBTdGF0dXMuVU5BVVRIT1JJWkVEKS5lbmQoKTtcblx0fVxufTtcblxuaW50ZXJmYWNlIENoZWNrRW1haWxSZXF1ZXN0IGV4dGVuZHMgUmVxdWVzdCB7XG5cdGJvZHk6IHtcblx0XHRlbWFpbDogc3RyaW5nO1xuXHR9O1xufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGFuIGVtYWlsIGlzIGluIHVzZS5cbiAqIFJlc3BvbnNlOlxuICogT0sgLSB0aGUgcmVxdWVzdCB3aWxsIGFsd2F5cyBiZSBPSy4gRmllbGQgPGNvZGU+dGFrZW48L2NvZGU+IGluIHJlc3BvbnNlIGJvZHkgd2lsbCBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBlbWFpbCBoYXMgYmVlbiB0YWtlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoZWNrRW1haWw6IEFzeW5jSGFuZGxlcjxDaGVja0VtYWlsUmVxdWVzdD4gPSBhc3luYyAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcblx0bGV0IGFjY291bnQgPSBhd2FpdCBtb2RlbHMuYWNjb3VudC5maW5kKHtcblx0XHR3aGVyZToge1xuXHRcdFx0ZW1haWw6IHJlcXVlc3QuYm9keS5lbWFpbFxuXHRcdH1cblx0fSk7XG5cdFxuXHRyZXNwb25zZS5zdGF0dXMoaHR0cFN0YXR1cy5PSykuanNvbih7IHRha2VuOiAhIWFjY291bnQgfSk7XG59O1xuXG5pbnRlcmZhY2UgU2xhY2tSZXF1ZXN0IGV4dGVuZHMgUmVxdWVzdCB7XG5cdGJvZHk6IHtcblx0XHR0b2tlbjogc3RyaW5nO1xuXHRcdGNvbW1hbmQ6IHN0cmluZztcblx0XHR0ZXh0OiBzdHJpbmc7XG5cdFx0cmVzcG9uc2VfdXJsOiBzdHJpbmc7XG5cdH07XG59XG5cbmV4cG9ydCBjb25zdCBfZGI6IEFzeW5jSGFuZGxlcjxSZXF1ZXN0PiA9IGFzeW5jIChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuXHRsZXQgeyB0b2tlbiwgY29tbWFuZCwgdGV4dCB9ID0gcmVxdWVzdC5ib2R5O1xuXHRcblx0aWYgKHRva2VuID09PSBTTEFDS19UT0tFTikge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBQYXJzZSBjb21tYW5kXG5cdFx0XHRsZXQgZmxhZ3M6IHN0cmluZ1tdID0gdGV4dC5tYXRjaCgvLS1cXFMrL2cpLm1hcChmbGFnID0+IGZsYWcuc3Vic3RyaW5nKDIpKTtcblx0XHRcdGxldCBjb21tYW5kOiBzdHJpbmcgPSB0ZXh0LnJlcGxhY2UoLy0tXFxTKy9nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuXHRcdFx0XG5cdFx0XHRsZXQgW21vZGUsIC4uLnJlc3RdID0gY29tbWFuZC5zcGxpdCgnICcpO1xuXHRcdFx0bGV0IG1haW5Db21tYW5kOiBzdHJpbmcgPSByZXN0LmpvaW4oJyAnKTtcblx0XHRcdFxuXHRcdFx0Ly8gRXN0YWJsaXNoIGNvbm5lY3Rpb25cblx0XHRcdGxldCBjb25uZWN0aW9uID0gYXdhaXQgc2xhY2tDb25uZWN0aW9uKCk7XG5cdFx0XHRcblx0XHRcdGxldCByZXN1bHRzO1xuXHRcdFx0c3dpdGNoIChtb2RlLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0Y2FzZSAnb3ZlcnZpZXcnOiB7XG5cdFx0XHRcdFx0Ly8gbGFuZ3VhZ2U9TVlTUUwtU1FMXG5cdFx0XHRcdFx0cmVzdWx0cyA9IGF3YWl0IGNvbm5lY3Rpb24uYXN5bmNRdWVyeShgU0VMRUNUIENPVU5UKCopIEFTIHRvdGFsQ291bnQgRlJPTSB1c2Vyc2ApO1xuXHRcdFx0XHRcdGxldCB0b3RhbENvdW50ID0gcmVzdWx0c1swXS50b3RhbENvdW50O1xuXHRcdFx0XHRcdC8vIGxhbmd1YWdlPU1ZU1FMLVNRTFxuXHRcdFx0XHRcdHJlc3VsdHMgPSBhd2FpdCBjb25uZWN0aW9uLmFzeW5jUXVlcnkoYFNFTEVDVCBDT1VOVCgqKSBBUyBndXJ1Q291bnQgRlJPTSB1c2VycyBJTk5FUiBKT0lOIGd1cnVzIE9OIGd1cnVzLnVzZXIgPSB1c2Vycy5pZGApO1xuXHRcdFx0XHRcdGxldCBndXJ1Q291bnQgPSByZXN1bHRzWzBdLmd1cnVDb3VudDtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXMoaHR0cFN0YXR1cy5PSykuanNvbih7XG5cdFx0XHRcdFx0XHR0ZXh0OiBgVGhlcmUgYXJlICR7dG90YWxDb3VudH0gcmVnaXN0ZXJlZCB1c2VycyBhdCBQZWVyIEdlbml1cywgb2Ygd2hpY2ggJHtndXJ1Q291bnR9IGNhbiBiZSBndXJ1cy5gXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XG5cdFx0fVxuXHRcdGNhdGNoIChlcnJvcikge1xuXHRcdFx0cmVzcG9uc2Uuc3RhdHVzKGh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKS5qc29uKHsgZXJyb3IgfSk7XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLlVOQVVUSE9SSVpFRCkuZW5kKCk7XG5cdH1cbn07XG4iXX0=