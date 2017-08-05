import deepmerge from 'deepmerge';

import { serverURL } from '../config';

/**
 * Sends a POST request to the defined route.
 *
 * @param {string} route The route; should start with <code>/api</code>
 * @param {Object} body The request body
 * @param {Object} fetchParams Additional fetch parameters
 * @return {Promise.<*>} Server response (<b>not</b> converted to JSON)
 */
export const post = (route, body, fetchParams = {}) => {
	if (!route.startsWith('/')) {
		route = '/' + route;
	}
	
	return fetch(serverURL + route, deepmerge({
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
		credentials: 'include'
	}, fetchParams));
};
