// TODO finish writing message
export const generateWelcomeEmail = (email, key) => ({
	from: 'peergeniusx@gmail.com',
	to: email,
	subject: 'Thank you for registering for Peer Genius!',
	generateTextFromHTML: true,
	html: `<p>Hello,</p>
		<p>Thank you for registering for Peer Genius!</p>
		<p>Thank you.</p>`
});
