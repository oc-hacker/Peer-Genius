// Mostly housekeeping actions that should be called upon initialization or login.
import cookies from 'js-cookie';

import types from '../types';
import { get, post } from '../request';
import { handleStore } from './utils';

/**
 * Thunk action creator called upon page load.
 * Fetches communication methods and available subjects.
 */
export const initialize = () => async dispatch => {
	dispatch({ type: types.INIT_START });
	
	// Retrieve basic server information
	let [
		communicationMethodsResponse,
		subjectsResponse,
		configResponse
	] = await Promise.all([
		get('/loc/comms.json'),
		get('/loc/subjects.json'),
		get('/api/config')
	]);
	
	if (communicationMethodsResponse.ok && subjectsResponse.ok && configResponse.ok) {
		let communicationMethods = await communicationMethodsResponse.json();
		let flatSubjects = await subjectsResponse.json();
		let serverConfig = await configResponse.json();
		
		// Unflatten flatSubjects
		let subjects = {};
		for (let s in flatSubjects) {
			if (flatSubjects.hasOwnProperty(s)) {
				let [category, subject] = s.split(':', 2);
				if (!subjects[category]) {
					subjects[category] = {
						[subject]: flatSubjects[s]
					};
				}
				else {
					subjects[category][subject] = flatSubjects[s];
				}
			}
		}
		
		await dispatch({
			type: types.INIT_CONFIG,
			payload: {
				communicationMethods,
				subjects,
				serverConfig
			}
		});
	}
	
	// If logged in, retrieve user information
	if (cookies.get('sessionJWT')) {
		let response = await post('/api/account/info');
		
		if (response.ok) {
			let json = await response.json();
			await dispatch(handleStore(json));
		}
	}
	
	dispatch({ type: types.INIT_END });
};
