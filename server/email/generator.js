"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO finish writing message
exports.generateWelcomeEmail = (email, key) => ({
    from: 'peergeniusx@gmail.com',
    to: email,
    subject: 'Thank you for registering for Peer Genius!',
    generateTextFromHTML: true,
    html: `<p>Hello,</p>
		<p>Thank you for registering for Peer Genius!</p>
		<p>Thank you.</p>`
});
//# sourceMappingURL=generator.js.map