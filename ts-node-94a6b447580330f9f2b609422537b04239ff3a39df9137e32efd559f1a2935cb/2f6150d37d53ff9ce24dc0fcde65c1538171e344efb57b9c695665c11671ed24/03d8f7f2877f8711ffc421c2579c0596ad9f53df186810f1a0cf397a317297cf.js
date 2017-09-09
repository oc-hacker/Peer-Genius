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
const models = require("../../database/models/index");
const user_1 = require("../../database/models/user");
// One function for all user editing
/**
 * Response:
 * OK - edit successful
 * BAD_REQUEST - user not found (should not happen)
 */
exports.edit = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let user = yield models.user.find({
        where: {
            id: request.body.user.id
        }
    });
    if (user) {
        yield user.update(request.body);
        yield user.save({ fields: user_1.exposedAttributes });
        response.status(httpStatus.OK).end();
    }
    else {
        response.status(httpStatus.BAD_REQUEST).end();
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9mdW5jdGlvbnMvdXNlci50cyIsInNvdXJjZXMiOlsiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9mdW5jdGlvbnMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBRWhELHNEQUFzRDtBQUN0RCxxREFBaUY7QUFrQmpGLG9DQUFvQztBQUNwQzs7OztHQUlHO0FBQ1UsUUFBQSxJQUFJLEdBQWtDLENBQU8sT0FBTyxFQUFFLFFBQVE7SUFDMUUsSUFBSSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNqQyxLQUFLLEVBQUU7WUFDTixFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUN4QjtLQUNELENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSx3QkFBYyxFQUFDLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDTCxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0FBQ0YsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBodHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzLWNvZGVzJztcblxuaW1wb3J0ICogYXMgbW9kZWxzIGZyb20gJy4uLy4uL2RhdGFiYXNlL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBleHBvc2VkQXR0cmlidXRlcyBhcyB1c2VyQXR0cmlidXRlcyB9IGZyb20gJy4uLy4uL2RhdGFiYXNlL21vZGVscy91c2VyJztcbmltcG9ydCB7IEFzeW5jSGFuZGxlciwgVmVyaWZpZWRSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgRWRpdFVzZXJSZXF1ZXN0IGV4dGVuZHMgVmVyaWZpZWRSZXF1ZXN0IHtcblx0Ym9keToge1xuXHRcdHVzZXI6IHtcblx0XHRcdGlkOiBzdHJpbmc7XG5cdFx0fTtcblx0XHRmaXJzdE5hbWU6IHN0cmluZztcblx0XHRsYXN0TmFtZTogc3RyaW5nO1xuXHRcdGJpcnRoZGF5OiB7XG5cdFx0XHR5ZWFyOiBudW1iZXI7XG5cdFx0XHRtb250aDogbnVtYmVyO1xuXHRcdFx0ZGF5OiBudW1iZXI7XG5cdFx0fVxuXHR9O1xufVxuXG4vLyBPbmUgZnVuY3Rpb24gZm9yIGFsbCB1c2VyIGVkaXRpbmdcbi8qKlxuICogUmVzcG9uc2U6XG4gKiBPSyAtIGVkaXQgc3VjY2Vzc2Z1bFxuICogQkFEX1JFUVVFU1QgLSB1c2VyIG5vdCBmb3VuZCAoc2hvdWxkIG5vdCBoYXBwZW4pXG4gKi9cbmV4cG9ydCBjb25zdCBlZGl0OiBBc3luY0hhbmRsZXI8RWRpdFVzZXJSZXF1ZXN0PiA9IGFzeW5jIChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuXHRsZXQgdXNlciA9IGF3YWl0IG1vZGVscy51c2VyLmZpbmQoe1xuXHRcdHdoZXJlOiB7XG5cdFx0XHRpZDogcmVxdWVzdC5ib2R5LnVzZXIuaWRcblx0XHR9XG5cdH0pO1xuXHRcblx0aWYgKHVzZXIpIHtcblx0XHRhd2FpdCB1c2VyLnVwZGF0ZShyZXF1ZXN0LmJvZHkpO1xuXHRcdGF3YWl0IHVzZXIuc2F2ZSh7ZmllbGRzOiB1c2VyQXR0cmlidXRlc30pO1xuXHRcdHJlc3BvbnNlLnN0YXR1cyhodHRwU3RhdHVzLk9LKS5lbmQoKTtcblx0fVxuXHRlbHNlIHtcblx0XHRyZXNwb25zZS5zdGF0dXMoaHR0cFN0YXR1cy5CQURfUkVRVUVTVCkuZW5kKCk7XG5cdH1cbn07XG4iXX0=