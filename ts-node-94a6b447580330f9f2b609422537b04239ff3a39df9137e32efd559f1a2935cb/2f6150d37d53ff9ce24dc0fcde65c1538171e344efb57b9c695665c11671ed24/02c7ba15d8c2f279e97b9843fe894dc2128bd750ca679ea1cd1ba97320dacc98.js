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
// All actions related to handing connection and online status.
const models = require("../database/models");
const guru_1 = require("../database/models/guru");
const sequelize = require("sequelize");
const chat_1 = require("./chat");
/**
 * Maps user id to a list of sockets that the user has open.
 */
exports.socketRegistry = {};
/**
 * Maps the user id to user sequelize instance. This registry only maintains record of the users currently online. Once a user is offline the corresponding record will be deleted.
 */
exports.onlineUsers = {};
const guruCondition = guru_1.subjects.map(subject => `\`guru\`.\`${subject}\``).join(' OR ');
const attach = (socket, user) => __awaiter(this, void 0, void 0, function* () {
    console.log('User', user, 'connected.');
    const userInstance = yield models.user.find({
        where: {
            id: user
        },
        include: [{
                model: models.guru,
                attributes: []
            }],
        attributes: [
            'id',
            [sequelize.fn('CONCAT', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'name'],
            [sequelize.literal(guruCondition), 'isGuru'] // subject1 OR subject2 OR ... AS isGuru
        ],
    });
    //join a room with the user's UUID
    socket.join(user);
    // Save the socket id to registry.
    socket.user = user;
    exports.socketRegistry[user] = [...(exports.socketRegistry[user] || []), socket];
    exports.onlineUsers[user] = userInstance;
    // Broadcast that a user connected.
    socket.broadcast.emit('user_connect', userInstance);
    socket.on('disconnect', () => {
        console.log('User', user, 'disconnected.');
        // Remove the registry entry
        exports.socketRegistry[user] = exports.socketRegistry[user].filter(userSocket => userSocket.id !== socket.id);
        // Check if user is completely disconnected.
        if (exports.socketRegistry[user].length === 0) {
            delete exports.onlineUsers[user];
            socket.broadcast.emit('user_disconnect', userInstance);
        }
    });
    //handle sending messages
    socket.on('sendMessage', (data) => __awaiter(this, void 0, void 0, function* () { return yield chat_1.sendMessage(data, user, socket); }));
    // Send information about the users currently online
    socket.emit('update_online_users', exports.onlineUsers);
});
exports.default = { attach };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3NvY2tldC9jb25uZWN0aW9uLnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvc29ja2V0L2Nvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtEQUErRDtBQUMvRCw2Q0FBNkM7QUFDN0Msa0RBQW1EO0FBR25ELHVDQUF1QztBQUN2QyxpQ0FBcUM7QUFjckM7O0dBRUc7QUFDVSxRQUFBLGNBQWMsR0FBMkIsRUFBRSxDQUFDO0FBRXpEOztHQUVHO0FBQ1UsUUFBQSxXQUFXLEdBQTJCLEVBQUUsQ0FBQztBQUV0RCxNQUFNLGFBQWEsR0FBRyxlQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxjQUFjLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXRGLE1BQU0sTUFBTSxHQUFHLENBQU8sTUFBa0IsRUFBRSxJQUFZO0lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN4QyxNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzNDLEtBQUssRUFBRTtZQUNOLEVBQUUsRUFBRSxJQUFJO1NBQ1I7UUFDRCxPQUFPLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ2xCLFVBQVUsRUFBRSxFQUFFO2FBQ2QsQ0FBQztRQUNGLFVBQVUsRUFBRTtZQUNYLElBQUk7WUFDSixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUM7WUFDNUYsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLHdDQUF3QztTQUNyRjtLQUNELENBQUMsQ0FBQztJQUNILGtDQUFrQztJQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxCLGtDQUFrQztJQUNsQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixzQkFBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakUsbUJBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7SUFDakMsbUNBQW1DO0lBQ25DLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUVwRCxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDM0MsNEJBQTRCO1FBQzVCLHNCQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsc0JBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTlGLDRDQUE0QztRQUM1QyxFQUFFLENBQUMsQ0FBQyxzQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sbUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSCx5QkFBeUI7SUFDekIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBTyxJQUFhLG9EQUFLLE1BQU0sQ0FBTixNQUFNLGtCQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQSxHQUFBLENBQUMsQ0FBQztJQUV6RixvREFBb0Q7SUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxtQkFBVyxDQUFDLENBQUM7QUFFakQsQ0FBQyxDQUFBLENBQUM7QUFFRixrQkFBZSxFQUFFLE1BQU0sRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQWxsIGFjdGlvbnMgcmVsYXRlZCB0byBoYW5kaW5nIGNvbm5lY3Rpb24gYW5kIG9ubGluZSBzdGF0dXMuXHJcbmltcG9ydCAqIGFzIG1vZGVscyBmcm9tICcuLi9kYXRhYmFzZS9tb2RlbHMnO1xyXG5pbXBvcnQgeyBzdWJqZWN0cyB9IGZyb20gJy4uL2RhdGFiYXNlL21vZGVscy9ndXJ1JztcclxuaW1wb3J0IHsgVXNlckluc3RhbmNlIH0gZnJvbSAnLi4vZGF0YWJhc2UvbW9kZWxzL3VzZXInO1xyXG5pbXBvcnQgeyBVc2VyU29ja2V0IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgKiBhcyBzZXF1ZWxpemUgZnJvbSAnc2VxdWVsaXplJztcclxuaW1wb3J0IHsgc2VuZE1lc3NhZ2UgfSBmcm9tICcuL2NoYXQnO1xyXG5cclxuaW50ZXJmYWNlIFJlZ2lzdHJ5PFY+IHtcclxuXHRba2V5OiBzdHJpbmddOiBWO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIG9iamVjdCBmb3IgbWVzc2FnZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2Uge1xyXG5cdHRvOiBzdHJpbmc7XHJcblx0bWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogTWFwcyB1c2VyIGlkIHRvIGEgbGlzdCBvZiBzb2NrZXRzIHRoYXQgdGhlIHVzZXIgaGFzIG9wZW4uXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc29ja2V0UmVnaXN0cnk6IFJlZ2lzdHJ5PFVzZXJTb2NrZXRbXT4gPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBNYXBzIHRoZSB1c2VyIGlkIHRvIHVzZXIgc2VxdWVsaXplIGluc3RhbmNlLiBUaGlzIHJlZ2lzdHJ5IG9ubHkgbWFpbnRhaW5zIHJlY29yZCBvZiB0aGUgdXNlcnMgY3VycmVudGx5IG9ubGluZS4gT25jZSBhIHVzZXIgaXMgb2ZmbGluZSB0aGUgY29ycmVzcG9uZGluZyByZWNvcmQgd2lsbCBiZSBkZWxldGVkLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG9ubGluZVVzZXJzOiBSZWdpc3RyeTxVc2VySW5zdGFuY2U+ID0ge307XHJcblxyXG5jb25zdCBndXJ1Q29uZGl0aW9uID0gc3ViamVjdHMubWFwKHN1YmplY3QgPT4gYFxcYGd1cnVcXGAuXFxgJHtzdWJqZWN0fVxcYGApLmpvaW4oJyBPUiAnKTtcclxuXHJcbmNvbnN0IGF0dGFjaCA9IGFzeW5jIChzb2NrZXQ6IFVzZXJTb2NrZXQsIHVzZXI6IHN0cmluZykgPT4ge1xyXG5cdGNvbnNvbGUubG9nKCdVc2VyJywgdXNlciwgJ2Nvbm5lY3RlZC4nKTtcclxuXHRjb25zdCB1c2VySW5zdGFuY2UgPSBhd2FpdCBtb2RlbHMudXNlci5maW5kKHtcclxuXHRcdHdoZXJlOiB7XHJcblx0XHRcdGlkOiB1c2VyXHJcblx0XHR9LFxyXG5cdFx0aW5jbHVkZTogW3tcclxuXHRcdFx0bW9kZWw6IG1vZGVscy5ndXJ1LFxyXG5cdFx0XHRhdHRyaWJ1dGVzOiBbXVxyXG5cdFx0fV0sXHJcblx0XHRhdHRyaWJ1dGVzOiBbXHJcblx0XHRcdCdpZCcsXHJcblx0XHRcdFtzZXF1ZWxpemUuZm4oJ0NPTkNBVCcsIHNlcXVlbGl6ZS5jb2woJ2ZpcnN0TmFtZScpLCAnICcsIHNlcXVlbGl6ZS5jb2woJ2xhc3ROYW1lJykpLCAnbmFtZSddLCAvLyBDT05DQVQoYGZpcnN0TmFtZWAsICcgJywgYGxhc3ROYW1lYClcclxuXHRcdFx0W3NlcXVlbGl6ZS5saXRlcmFsKGd1cnVDb25kaXRpb24pLCAnaXNHdXJ1J10gLy8gc3ViamVjdDEgT1Igc3ViamVjdDIgT1IgLi4uIEFTIGlzR3VydVxyXG5cdFx0XSxcclxuXHR9KTtcclxuXHQvL2pvaW4gYSByb29tIHdpdGggdGhlIHVzZXIncyBVVUlEXHJcblx0c29ja2V0LmpvaW4odXNlcik7XHJcblx0XHJcblx0Ly8gU2F2ZSB0aGUgc29ja2V0IGlkIHRvIHJlZ2lzdHJ5LlxyXG5cdHNvY2tldC51c2VyID0gdXNlcjtcclxuXHRzb2NrZXRSZWdpc3RyeVt1c2VyXSA9IFsuLi4oc29ja2V0UmVnaXN0cnlbdXNlcl0gfHwgW10pLCBzb2NrZXRdO1xyXG5cdG9ubGluZVVzZXJzW3VzZXJdID0gdXNlckluc3RhbmNlO1xyXG5cdC8vIEJyb2FkY2FzdCB0aGF0IGEgdXNlciBjb25uZWN0ZWQuXHJcblx0c29ja2V0LmJyb2FkY2FzdC5lbWl0KCd1c2VyX2Nvbm5lY3QnLCB1c2VySW5zdGFuY2UpO1xyXG5cdFxyXG5cdHNvY2tldC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcclxuXHRcdGNvbnNvbGUubG9nKCdVc2VyJywgdXNlciwgJ2Rpc2Nvbm5lY3RlZC4nKTtcclxuXHRcdC8vIFJlbW92ZSB0aGUgcmVnaXN0cnkgZW50cnlcclxuXHRcdHNvY2tldFJlZ2lzdHJ5W3VzZXJdID0gc29ja2V0UmVnaXN0cnlbdXNlcl0uZmlsdGVyKHVzZXJTb2NrZXQgPT4gdXNlclNvY2tldC5pZCAhPT0gc29ja2V0LmlkKTtcclxuXHRcdFxyXG5cdFx0Ly8gQ2hlY2sgaWYgdXNlciBpcyBjb21wbGV0ZWx5IGRpc2Nvbm5lY3RlZC5cclxuXHRcdGlmIChzb2NrZXRSZWdpc3RyeVt1c2VyXS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0ZGVsZXRlIG9ubGluZVVzZXJzW3VzZXJdO1xyXG5cdFx0XHRzb2NrZXQuYnJvYWRjYXN0LmVtaXQoJ3VzZXJfZGlzY29ubmVjdCcsIHVzZXJJbnN0YW5jZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0Ly9oYW5kbGUgc2VuZGluZyBtZXNzYWdlc1xyXG5cdHNvY2tldC5vbignc2VuZE1lc3NhZ2UnLCBhc3luYyAoZGF0YTogTWVzc2FnZSkgPT4gYXdhaXQgc2VuZE1lc3NhZ2UoZGF0YSwgdXNlciwgc29ja2V0KSk7XHJcblx0XHJcblx0Ly8gU2VuZCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdXNlcnMgY3VycmVudGx5IG9ubGluZVxyXG5cdHNvY2tldC5lbWl0KCd1cGRhdGVfb25saW5lX3VzZXJzJywgb25saW5lVXNlcnMpO1xyXG5cdFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBhdHRhY2ggfTtcclxuIl19