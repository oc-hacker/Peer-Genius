import nodemailer from 'nodemailer';
import xoauth2 from 'xoauth2';

import config from '../core/config.js';

let transport;

export function initMailer() {
    transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator(config.mailerXOAuth2)
        }
    });

    console.log('Mailer initialized.')
}

export function send(mailOptions) {
    transport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        }

        console.log('Message sent:', response);
    });
}