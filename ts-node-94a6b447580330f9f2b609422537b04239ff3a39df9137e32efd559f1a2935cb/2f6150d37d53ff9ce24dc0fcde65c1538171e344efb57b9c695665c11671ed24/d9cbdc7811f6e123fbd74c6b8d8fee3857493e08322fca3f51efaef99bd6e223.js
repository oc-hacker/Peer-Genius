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
const sio = require("socket.io");
const jwt = require("jsonwebtoken");
const server_1 = require("./server");
const utils_1 = require("../router/misc/utils");
const socket_1 = require("../socket");
const { JWT_SECRET } = process.env;
exports.io = sio(server_1.default);
const secret = new Buffer(JWT_SECRET, 'base64');
exports.io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
    // Verify valid JWT
    let { jwt: token } = socket.handshake.query;
    try {
        let user = jwt.verify(token, secret);
        try {
            yield Promise.all([
                socket_1.connection.attach(socket, user.id)
            ]);
        }
        catch (error) {
            console.error('Unexpected error when configuring socket connection for user', user.id);
            utils_1.logError([
                'Socket configuration error:',
                error
            ].join('\n'));
        }
    }
    catch (error) {
        console.warn('Unauthorized socket.io connection attempt rejected.');
    }
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL2NvcmUvc29ja2V0LnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvY29yZS9zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQyxvQ0FBb0M7QUFFcEMscUNBQThCO0FBQzlCLGdEQUFnRDtBQUNoRCxzQ0FBdUM7QUFHdkMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFdEIsUUFBQSxFQUFFLEdBQUcsR0FBRyxDQUFDLGdCQUFNLENBQUMsQ0FBQztBQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFaEQsVUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBTyxNQUF1QjtJQUNqRCxtQkFBbUI7SUFDbkIsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUU1QyxJQUFJLENBQUM7UUFDSixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQW1CLENBQUM7UUFFdkQsSUFBSSxDQUFDO1lBQ0osTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNqQixtQkFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFvQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDaEQsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDhEQUE4RCxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2RixnQkFBUSxDQUFDO2dCQUNSLDZCQUE2QjtnQkFDN0IsS0FBSzthQUNMLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDZixDQUFDO0lBQ0YsQ0FBQztJQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7SUFDckUsQ0FBQztBQUNGLENBQUMsQ0FBQSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzaW8gZnJvbSAnc29ja2V0LmlvJztcbmltcG9ydCAqIGFzIGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuXG5pbXBvcnQgc2VydmVyIGZyb20gJy4vc2VydmVyJztcbmltcG9ydCB7IGxvZ0Vycm9yIH0gZnJvbSAnLi4vcm91dGVyL21pc2MvdXRpbHMnO1xuaW1wb3J0IHsgY29ubmVjdGlvbiB9IGZyb20gJy4uL3NvY2tldCc7XG5pbXBvcnQgeyBVc2VyU29ja2V0IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCB7IEpXVF9TRUNSRVQgfSA9IHByb2Nlc3MuZW52O1xuXG5leHBvcnQgY29uc3QgaW8gPSBzaW8oc2VydmVyKTtcbmNvbnN0IHNlY3JldCA9IG5ldyBCdWZmZXIoSldUX1NFQ1JFVCwgJ2Jhc2U2NCcpO1xuXG5pby5vbignY29ubmVjdGlvbicsIGFzeW5jIChzb2NrZXQ6IFNvY2tldElPLlNvY2tldCkgPT4ge1xuXHQvLyBWZXJpZnkgdmFsaWQgSldUXG5cdGxldCB7IGp3dDogdG9rZW4gfSA9IHNvY2tldC5oYW5kc2hha2UucXVlcnk7XG5cdFxuXHR0cnkge1xuXHRcdGxldCB1c2VyID0gand0LnZlcmlmeSh0b2tlbiwgc2VjcmV0KSBhcyB7IGlkOiBzdHJpbmcgfTtcblx0XHRcblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgUHJvbWlzZS5hbGwoW1xuXHRcdFx0XHRjb25uZWN0aW9uLmF0dGFjaChzb2NrZXQgYXMgVXNlclNvY2tldCwgdXNlci5pZClcblx0XHRcdF0pO1xuXHRcdH1cblx0XHRjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3Igd2hlbiBjb25maWd1cmluZyBzb2NrZXQgY29ubmVjdGlvbiBmb3IgdXNlcicsIHVzZXIuaWQpO1xuXHRcdFx0bG9nRXJyb3IoW1xuXHRcdFx0XHQnU29ja2V0IGNvbmZpZ3VyYXRpb24gZXJyb3I6Jyxcblx0XHRcdFx0ZXJyb3Jcblx0XHRcdF0uam9pbignXFxuJykpO1xuXHRcdH1cblx0fVxuXHRjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLndhcm4oJ1VuYXV0aG9yaXplZCBzb2NrZXQuaW8gY29ubmVjdGlvbiBhdHRlbXB0IHJlamVjdGVkLicpO1xuXHR9XG59KTtcbiJdfQ==