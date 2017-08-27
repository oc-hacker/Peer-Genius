import * as  nodemailer from 'nodemailer';
import { createXOAuth2Generator } from 'xoauth2';

const { XOAUTH2_ACCESS_URL, XOAUTH2_HEADERS, XOAUTH2_PARAMS } = process.env;

let transport;

export function initMailer() {
	transport = nodemailer.createTransport(<object>{
		service: 'Gmail',
		auth: {
			xoauth2: createXOAuth2Generator({
				accessUrl: XOAUTH2_ACCESS_URL,
				customHeaders: JSON.parse(XOAUTH2_HEADERS || '{}'),
				customParams: JSON.parse(XOAUTH2_PARAMS || '{}')
			})
		}
	});
	
	console.log('Mailer initialized.');
}

export function send(mailOptions) {
	transport.sendMail(mailOptions, function (error, response) {
		if (error) {
			console.log(error);
		}
		
		console.log('Message sent:', response);
	});
}