import deepmerge from 'deepmerge';

import { serverURL } from '../../config';

export const status = {
	START: 'START',
	END: 'END'
};

/**
 * Sends a GET request to the input route.
 *
 * @param {string} route The route; should start with <code>/api</code>
 * @return {Promise.<*>} Server response (<b>not</b> converted to JSON)
 */
export const get = route => {
	if (!route.startsWith('/')) {
		route = '/' + route;
	}
	return fetch(serverURL + route);
};


/**
 * Sends a POST request to the input route.
 * By default, the headers include <code>Accept: application/json</code> and <code>Content-Type: application/json</code>, and the request will include credentials.
 *
 * @param {string} route The route; should start with <code>/api</code>
 * @param {Object} body The request body
 * @param {Object} fetchParams Additional fetch parameters
 * @return {Promise.<*>} Server response (<b>not</b> converted to JSON)
 */
export const post = (route, body = undefined, fetchParams = {}) => {
	if (!route.startsWith('/')) {
		route = '/' + route;
	}
	
	return fetch(serverURL + route, deepmerge({
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: body && JSON.stringify(body),
		credentials: 'include'
	}, fetchParams));
};
