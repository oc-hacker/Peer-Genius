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
const message_1 = require("../database/models/message");
/**
 * Sends a message to the given user.
 * @param {Object} data the data sent by the client. Contains the message and user to send it to.
 * @param {UUID} id the user's UUID
 * @param {SocketIO.Socket} socket the socket object (so we can call emit() on it)
 */
exports.sendMessage = (data, id, socket) => __awaiter(this, void 0, void 0, function* () {
    let newMsg = {
        from: id,
        to: data.to,
        message: data.message,
        createdAt: new Date()
    };
    //save the message to DB
    yield message_1.default.upsert(newMsg);
    //send the message to the recipient
    socket.broadcast.to(data.to).emit('receiveMessage', newMsg);
});
exports.default = { sendMessage: exports.sendMessage };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL3NvY2tldC9jaGF0LnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvc29ja2V0L2NoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdEQUFpRDtBQUdqRDs7Ozs7R0FLRztBQUNVLFFBQUEsV0FBVyxHQUFHLENBQU8sSUFBYSxFQUFFLEVBQVUsRUFBRSxNQUF1QjtJQUNuRixJQUFJLE1BQU0sR0FBRztRQUNaLElBQUksRUFBRSxFQUFFO1FBQ1IsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1FBQ3JCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtLQUNyQixDQUFDO0lBRUYsd0JBQXdCO0lBQ3hCLE1BQU0saUJBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFN0IsbUNBQW1DO0lBQ25DLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFBLENBQUM7QUFFRixrQkFBZSxFQUFFLFdBQVcsRUFBWCxtQkFBVyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWVzc2FnZSBmcm9tICcuLi9kYXRhYmFzZS9tb2RlbHMvbWVzc2FnZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL2Nvbm5lY3Rpb24nO1xyXG5cclxuLyoqXHJcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgZ2l2ZW4gdXNlci5cclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgdGhlIGRhdGEgc2VudCBieSB0aGUgY2xpZW50LiBDb250YWlucyB0aGUgbWVzc2FnZSBhbmQgdXNlciB0byBzZW5kIGl0IHRvLlxyXG4gKiBAcGFyYW0ge1VVSUR9IGlkIHRoZSB1c2VyJ3MgVVVJRFxyXG4gKiBAcGFyYW0ge1NvY2tldElPLlNvY2tldH0gc29ja2V0IHRoZSBzb2NrZXQgb2JqZWN0IChzbyB3ZSBjYW4gY2FsbCBlbWl0KCkgb24gaXQpXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2VuZE1lc3NhZ2UgPSBhc3luYyAoZGF0YTogTWVzc2FnZSwgaWQ6IHN0cmluZywgc29ja2V0OiBTb2NrZXRJTy5Tb2NrZXQpID0+IHtcclxuXHRsZXQgbmV3TXNnID0ge1xyXG5cdFx0ZnJvbTogaWQsXHJcblx0XHR0bzogZGF0YS50byxcclxuXHRcdG1lc3NhZ2U6IGRhdGEubWVzc2FnZSxcclxuXHRcdGNyZWF0ZWRBdDogbmV3IERhdGUoKVxyXG5cdH07XHJcblx0XHJcblx0Ly9zYXZlIHRoZSBtZXNzYWdlIHRvIERCXHJcblx0YXdhaXQgbWVzc2FnZS51cHNlcnQobmV3TXNnKTtcclxuXHRcclxuXHQvL3NlbmQgdGhlIG1lc3NhZ2UgdG8gdGhlIHJlY2lwaWVudFxyXG5cdHNvY2tldC5icm9hZGNhc3QudG8oZGF0YS50bykuZW1pdCgncmVjZWl2ZU1lc3NhZ2UnLCBuZXdNc2cpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBzZW5kTWVzc2FnZSB9O1xyXG4iXX0=