// Mostly housekeeping actions that should be called upon initialization or login.
import types from '../types';
import { get } from '../request';

/**
 * Thunk action creator called upon page load.
 * Fetches communication methods and available subjects.
 */
export const initialize = () => async dispatch => {
	let [
		communicationMethodsResponse,
		subjectsResponse
	] = await Promise.all([
		get('/loc/comms.json'),
		get('/loc/subjects.json')
	]);
	
	if (communicationMethodsResponse.ok && subjectsResponse.ok) {
		let communicationMethods = await communicationMethodsResponse.json();
		let flatSubjects = await subjectsResponse.json();
		
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
		
		dispatch({
			type: types.INIT_CONFIG,
			payload: {
				communicationMethods,
				subjects
			}
		});
	}
};
