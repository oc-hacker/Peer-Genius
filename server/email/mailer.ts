import * as  nodemailer from 'nodemailer';
import { createXOAuth2Generator } from 'xoauth2';

import config from '../core/config';

let transport;

export function initMailer() {
	transport = nodemailer.createTransport(<object>{
		service: "Gmail",
		auth: {
			xoauth2: createXOAuth2Generator(config.mailerXOAuth2)
		}
	});
	
	console.log('Mailer initialized.')
}

export function send(mailOptions) {
	transport.sendMail(mailOptions, function (error, response) {
		if (error) {
			console.log(error);
		}
		
		console.log('Message sent:', response);
	});
}