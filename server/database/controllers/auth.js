import argon2 from 'argon2';
import logger from '../../log/logger';

export const createHash = async (password) => {
	logger.trace("Hashing password...");
	let hash = await argon2.hash(password, await argon2.generateSalt());
	logger.trace("Hashing complete.");
	return hash;
};

export const verifyHash = async (hash, input) => {
	return await argon2.verify(hash, input);
};
