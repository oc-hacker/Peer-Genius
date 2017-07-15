"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const config_1 = require("../../core/config");
const secret = new Buffer(config_1.default.sessionJWTKey, 'base64');
exports.createSessionToken = id => {
    return jwt.sign({ id }, secret, { expiresIn: config_1.default.sessionJWTExpire });
};
exports.verifySessionToken = function (request, response, next) {
    try {
        request.body.user = jwt.verify(request.cookies.sessionJWT, secret);
        next();
    }
    catch (err) {
        console.log(err.message);
        response.status(httpStatus.UNAUTHORIZED).json({ reason: 'Invalid session' });
    }
};
//# sourceMappingURL=auth.js.map