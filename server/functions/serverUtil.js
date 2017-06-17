import path from 'path';

/**
 * Express router middleware for logging whenever a request is received.
 * 
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const logger = function(request, response, next) {
	console.log(Date.now() + ": Request received.");
	next();
};

/**
 * Express router middleware for sending the index.html file on refresh.
 * 
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const sendIndex = function(request, response, next) {
	response.sendFile(path.resolve(__dirname, '../public/index.html'));
};

/**
 * Express router middleware for sending a status OK response.
 *
 * @param {Object} [request]
 * @param {Object} [response]
 * @param {Function} [next]
 */
export const ok = function(request, response, next) {
	response.status(200);
	next();
};

/**
 * Express router middleware for ending the response.
 * 
 * @param {Object} request
 * @param {Object} response
 */
export const end = function(request, response) {
	response.end();
};