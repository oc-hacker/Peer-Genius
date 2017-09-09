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
const models = require("../../database/models");
exports.getReviews = (request, response) => __awaiter(this, void 0, void 0, function* () {
    let sessions = yield models.session.all({
        where: {
            guru: request.body.guru,
            rating: {
                $not: null
            }
        }
    });
    let reviews = Promise.all(sessions
        .map(session => lodash_1.pick(session, 'id', 'newbie', 'subject', 'rating', 'comment'))
        .map((session) => models.user.find({
        where: {
            id: session.newbie
        }
    }).then(user => (Object.assign({}, session, { newbieName: `${user.firstName} ${user.lastName}` })))));
    response.status(httpStatus.OK).json({
        reviews
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9mdW5jdGlvbnMvZ3VydS50cyIsInNvdXJjZXMiOlsiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3JvdXRlci9mdW5jdGlvbnMvZ3VydS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQThCO0FBQzlCLGdEQUFnRDtBQUdoRCxnREFBZ0Q7QUFZbkMsUUFBQSxVQUFVLEdBQW9DLENBQU8sT0FBTyxFQUFFLFFBQVE7SUFDbEYsSUFBSSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN2QyxLQUFLLEVBQUU7WUFDTixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDUCxJQUFJLEVBQUUsSUFBSTthQUNWO1NBQ0Q7S0FDRCxDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUN4QixRQUFRO1NBQ04sR0FBRyxDQUFDLE9BQU8sSUFBSSxhQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUM3RSxHQUFHLENBQ0gsQ0FBQyxPQUF5RixLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9HLEtBQUssRUFBRTtZQUNOLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTTtTQUNsQjtLQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLG1CQUNaLE9BQU8sSUFDVixVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFDL0MsQ0FBQyxDQUNILENBQ0YsQ0FBQztJQUVGLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQyxPQUFPO0tBQ1AsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwaWNrIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIGh0dHBTdGF0dXMgZnJvbSAnaHR0cC1zdGF0dXMtY29kZXMnO1xuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgKiBhcyBtb2RlbHMgZnJvbSAnLi4vLi4vZGF0YWJhc2UvbW9kZWxzJztcblxuaW1wb3J0IHsgQXN5bmNIYW5kbGVyLCBWZXJpZmllZFJlcXVlc3QgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbi8vIFRPRE8gYXJlIHVzZXJzIHRoYXQgYXJlIG5vdCBsb2dnZWQgaW4gYWJsZSB0byBhY2Nlc3MgZ3VydSBwcm9maWxlcz9cbmludGVyZmFjZSBHZXRSZXZpZXdzUmVxdWVzdCBleHRlbmRzIFJlcXVlc3Qge1xuXHRib2R5OiB7XG5cdFx0LyoqIFRoZSBpZCBvZiB0aGUgZ3VydSAqL1xuXHRcdGd1cnU6IHN0cmluZztcblx0fTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFJldmlld3M6IEFzeW5jSGFuZGxlcjxHZXRSZXZpZXdzUmVxdWVzdD4gPSBhc3luYyAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcblx0bGV0IHNlc3Npb25zID0gYXdhaXQgbW9kZWxzLnNlc3Npb24uYWxsKHtcblx0XHR3aGVyZToge1xuXHRcdFx0Z3VydTogcmVxdWVzdC5ib2R5Lmd1cnUsXG5cdFx0XHRyYXRpbmc6IHtcblx0XHRcdFx0JG5vdDogbnVsbFxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdFxuXHRsZXQgcmV2aWV3cyA9IFByb21pc2UuYWxsKFxuXHRcdHNlc3Npb25zXG5cdFx0XHQubWFwKHNlc3Npb24gPT4gcGljayhzZXNzaW9uLCAnaWQnLCAnbmV3YmllJywgJ3N1YmplY3QnLCAncmF0aW5nJywgJ2NvbW1lbnQnKSlcblx0XHRcdC5tYXAoXG5cdFx0XHRcdChzZXNzaW9uOiB7IGlkOiBzdHJpbmcsIG5ld2JpZTogc3RyaW5nLCBzdWJqZWN0OiBzdHJpbmcsIHJhdGluZzogbnVtYmVyLCBjb21tZW50OiBzdHJpbmcgfSkgPT4gbW9kZWxzLnVzZXIuZmluZCh7XG5cdFx0XHRcdFx0d2hlcmU6IHtcblx0XHRcdFx0XHRcdGlkOiBzZXNzaW9uLm5ld2JpZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkudGhlbih1c2VyID0+ICh7XG5cdFx0XHRcdFx0Li4uc2Vzc2lvbixcblx0XHRcdFx0XHRuZXdiaWVOYW1lOiBgJHt1c2VyLmZpcnN0TmFtZX0gJHt1c2VyLmxhc3ROYW1lfWBcblx0XHRcdFx0fSkpXG5cdFx0XHQpXG5cdCk7XG5cdFxuXHRyZXNwb25zZS5zdGF0dXMoaHR0cFN0YXR1cy5PSykuanNvbih7XG5cdFx0cmV2aWV3c1xuXHR9KTtcbn07XG4iXX0=