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
const httpStatus = require("http-status-codes");
const argon2 = require("argon2");
const models = require("../../database/models/index");
const auth_1 = require("../misc/auth");
const utils_1 = require("../misc/utils");
const { JWT_EXPIRE } = process.env;
exports.edit = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let { user, password, newEmail, newPassword } = request.body;
    let account = yield models.account.find({
        where: {
            user: user.id
        }
    });
    if (!account || !password) {
        response.status(httpStatus.BAD_REQUEST).end();
        return;
    }
    if (yield argon2.verify(account.password, password)) {
        // TODO if this breaks partial edits, need to change.
        yield account.update({
            email: newEmail,
            password: newPassword
        });
        yield account.save({ fields: ['email', 'password', 'verified'] });
        response.status(httpStatus.OK).end();
    }
    else {
        response.status(httpStatus.UNAUTHORIZED).end();
    }
});
exports.verify = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).end();
});
exports.info = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).json(yield utils_1.buildStore(request.body.user.id));
});
exports.refresh = (request, response) => __awaiter(this, void 0, void 0, function* () {
    response.status(httpStatus.OK).json({
        session: {
            jwt: auth_1.createSessionToken(request.body.user.id),
            expire: parseInt(JWT_EXPIRE) * 1000
        }
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9mdW5jdGlvbnMvYWNjb3VudC50cyIsInNvdXJjZXMiOlsiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9mdW5jdGlvbnMvYWNjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELGlDQUFpQztBQUVqQyxzREFBc0Q7QUFDdEQsdUNBQWtEO0FBQ2xELHlDQUEyQztBQUczQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQWF0QixRQUFBLElBQUksR0FBcUMsQ0FBTyxPQUFPLEVBQUUsUUFBUTtJQUM3RSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUU3RCxJQUFJLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLEtBQUssRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNiO0tBQ0QsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlDLE1BQU0sQ0FBQztJQUNSLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQscURBQXFEO1FBQ3JELE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNwQixLQUFLLEVBQUUsUUFBUTtZQUNmLFFBQVEsRUFBRSxXQUFXO1NBQ3JCLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQztRQUNMLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2hELENBQUM7QUFDRixDQUFDLENBQUEsQ0FBQztBQUVXLFFBQUEsTUFBTSxHQUFrQyxDQUFPLE9BQU8sRUFBRSxRQUFRO0lBQzVFLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3RDLENBQUMsQ0FBQSxDQUFDO0FBRVcsUUFBQSxJQUFJLEdBQWtDLENBQU8sT0FBTyxFQUFFLFFBQVE7SUFDMUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sa0JBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdFLENBQUMsQ0FBQSxDQUFDO0FBRVcsUUFBQSxPQUFPLEdBQWtDLENBQU8sT0FBTyxFQUFFLFFBQVE7SUFDN0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25DLE9BQU8sRUFBRTtZQUNSLEdBQUcsRUFBRSx5QkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDN0MsTUFBTSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJO1NBQ25DO0tBQ0QsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBodHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcbmltcG9ydCAqIGFzIGFyZ29uMiBmcm9tICdhcmdvbjInO1xuXG5pbXBvcnQgKiBhcyBtb2RlbHMgZnJvbSAnLi4vLi4vZGF0YWJhc2UvbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGNyZWF0ZVNlc3Npb25Ub2tlbiB9IGZyb20gJy4uL21pc2MvYXV0aCc7XG5pbXBvcnQgeyBidWlsZFN0b3JlIH0gZnJvbSAnLi4vbWlzYy91dGlscyc7XG5pbXBvcnQgeyBBc3luY0hhbmRsZXIsIFZlcmlmaWVkUmVxdWVzdCB9IGZyb20gJy4uLy4uL3R5cGVzJztcblxuY29uc3QgeyBKV1RfRVhQSVJFIH0gPSBwcm9jZXNzLmVudjtcblxuaW50ZXJmYWNlIEVkaXRBY2NvdW50UmVxdWVzdCBleHRlbmRzIFZlcmlmaWVkUmVxdWVzdCB7XG5cdGJvZHk6IHtcblx0XHR1c2VyOiB7XG5cdFx0XHRpZDogc3RyaW5nO1xuXHRcdH0sXG5cdFx0cGFzc3dvcmQ6IHN0cmluZztcblx0XHRuZXdFbWFpbD86IHN0cmluZztcblx0XHRuZXdQYXNzd29yZD86IHN0cmluZztcblx0fTtcbn1cblxuZXhwb3J0IGNvbnN0IGVkaXQ6IEFzeW5jSGFuZGxlcjxFZGl0QWNjb3VudFJlcXVlc3Q+ID0gYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG5cdGxldCB7IHVzZXIsIHBhc3N3b3JkLCBuZXdFbWFpbCwgbmV3UGFzc3dvcmQgfSA9IHJlcXVlc3QuYm9keTtcblx0XG5cdGxldCBhY2NvdW50ID0gYXdhaXQgbW9kZWxzLmFjY291bnQuZmluZCh7XG5cdFx0d2hlcmU6IHtcblx0XHRcdHVzZXI6IHVzZXIuaWRcblx0XHR9XG5cdH0pO1xuXHRcblx0aWYgKCFhY2NvdW50IHx8ICFwYXNzd29yZCkge1xuXHRcdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLkJBRF9SRVFVRVNUKS5lbmQoKTtcblx0XHRyZXR1cm47XG5cdH1cblx0XG5cdGlmIChhd2FpdCBhcmdvbjIudmVyaWZ5KGFjY291bnQucGFzc3dvcmQsIHBhc3N3b3JkKSkge1xuXHRcdC8vIFRPRE8gaWYgdGhpcyBicmVha3MgcGFydGlhbCBlZGl0cywgbmVlZCB0byBjaGFuZ2UuXG5cdFx0YXdhaXQgYWNjb3VudC51cGRhdGUoe1xuXHRcdFx0ZW1haWw6IG5ld0VtYWlsLFxuXHRcdFx0cGFzc3dvcmQ6IG5ld1Bhc3N3b3JkXG5cdFx0fSk7XG5cdFx0YXdhaXQgYWNjb3VudC5zYXZlKHsgZmllbGRzOiBbJ2VtYWlsJywgJ3Bhc3N3b3JkJywgJ3ZlcmlmaWVkJ10gfSk7XG5cdFx0cmVzcG9uc2Uuc3RhdHVzKGh0dHBTdGF0dXMuT0spLmVuZCgpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLlVOQVVUSE9SSVpFRCkuZW5kKCk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB2ZXJpZnk6IEFzeW5jSGFuZGxlcjxWZXJpZmllZFJlcXVlc3Q+ID0gYXN5bmMgKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG5cdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLk9LKS5lbmQoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmZvOiBBc3luY0hhbmRsZXI8VmVyaWZpZWRSZXF1ZXN0PiA9IGFzeW5jIChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuXHRyZXNwb25zZS5zdGF0dXMoaHR0cFN0YXR1cy5PSykuanNvbihhd2FpdCBidWlsZFN0b3JlKHJlcXVlc3QuYm9keS51c2VyLmlkKSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVmcmVzaDogQXN5bmNIYW5kbGVyPFZlcmlmaWVkUmVxdWVzdD4gPSBhc3luYyAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcblx0cmVzcG9uc2Uuc3RhdHVzKGh0dHBTdGF0dXMuT0spLmpzb24oe1xuXHRcdHNlc3Npb246IHtcblx0XHRcdGp3dDogY3JlYXRlU2Vzc2lvblRva2VuKHJlcXVlc3QuYm9keS51c2VyLmlkKSxcblx0XHRcdGV4cGlyZTogcGFyc2VJbnQoSldUX0VYUElSRSkgKiAxMDAwXG5cdFx0fVxuXHR9KTtcbn07XG4iXX0=