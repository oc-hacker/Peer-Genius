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
const models = require("../../database/models");
exports.review = (request, response) => __awaiter(this, void 0, void 0, function* () {
    // TODO testing
    let { user, session: sessionId, rating, comment = '' } = request.body;
    let session = yield models.session.find({
        where: {
            id: sessionId,
            newbie: user.id
        }
    });
    if (session) {
        yield session.set({
            rating,
            comment
        });
        yield session.save();
        response.status(httpStatus.OK).end();
    }
    else {
        response.status(httpStatus.BAD_REQUEST).end();
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9mdW5jdGlvbnMvbmV3YmllLnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvcm91dGVyL2Z1bmN0aW9ucy9uZXdiaWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGdEQUFnRDtBQUVoRCxnREFBZ0Q7QUFlbkMsUUFBQSxNQUFNLEdBQXVDLENBQU8sT0FBTyxFQUFFLFFBQVE7SUFDakYsZUFBZTtJQUNmLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFFdEUsSUFBSSxPQUFPLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN2QyxLQUFLLEVBQUU7WUFDTixFQUFFLEVBQUUsU0FBUztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNmO0tBQ0QsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNqQixNQUFNO1lBQ04sT0FBTztTQUNQLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBQztRQUNMLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQy9DLENBQUM7QUFDRixDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuXG5pbXBvcnQgKiBhcyBtb2RlbHMgZnJvbSAnLi4vLi4vZGF0YWJhc2UvbW9kZWxzJztcblxuaW1wb3J0IHsgQXN5bmNIYW5kbGVyLCBWZXJpZmllZFJlcXVlc3QgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmludGVyZmFjZSBSZXZpZXdTZXNzaW9uUmVxdWVzdCBleHRlbmRzIFZlcmlmaWVkUmVxdWVzdCB7XG5cdGJvZHk6IHtcblx0XHR1c2VyOiB7XG5cdFx0XHRpZDogc3RyaW5nO1xuXHRcdH1cblx0XHRzZXNzaW9uOiBzdHJpbmc7XG5cdFx0cmF0aW5nOiBudW1iZXI7XG5cdFx0Y29tbWVudD86IHN0cmluZztcblx0fTtcbn1cblxuZXhwb3J0IGNvbnN0IHJldmlldzogQXN5bmNIYW5kbGVyPFJldmlld1Nlc3Npb25SZXF1ZXN0PiA9IGFzeW5jIChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuXHQvLyBUT0RPIHRlc3Rpbmdcblx0bGV0IHsgdXNlciwgc2Vzc2lvbjogc2Vzc2lvbklkLCByYXRpbmcsIGNvbW1lbnQgPSAnJyB9ID0gcmVxdWVzdC5ib2R5O1xuXHRcblx0bGV0IHNlc3Npb24gPSBhd2FpdCBtb2RlbHMuc2Vzc2lvbi5maW5kKHtcblx0XHR3aGVyZToge1xuXHRcdFx0aWQ6IHNlc3Npb25JZCxcblx0XHRcdG5ld2JpZTogdXNlci5pZFxuXHRcdH1cblx0fSk7XG5cdFxuXHRpZiAoc2Vzc2lvbikge1xuXHRcdGF3YWl0IHNlc3Npb24uc2V0KHtcblx0XHRcdHJhdGluZyxcblx0XHRcdGNvbW1lbnRcblx0XHR9KTtcblx0XHRhd2FpdCBzZXNzaW9uLnNhdmUoKTtcblx0XHRyZXNwb25zZS5zdGF0dXMoaHR0cFN0YXR1cy5PSykuZW5kKCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0cmVzcG9uc2Uuc3RhdHVzKGh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpLmVuZCgpO1xuXHR9XG59O1xuIl19