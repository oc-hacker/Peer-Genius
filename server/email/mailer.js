"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const xoauth2_1 = require("xoauth2");
const config_1 = require("../core/config");
let transport;
function initMailer() {
    transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            xoauth2: xoauth2_1.createXOAuth2Generator(config_1.default.mailerXOAuth2)
        }
    });
    console.log('Mailer initialized.');
}
exports.initMailer = initMailer;
function send(mailOptions) {
    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('Message sent:', response);
    });
}
exports.send = send;
//# sourceMappingURL=mailer.js.map