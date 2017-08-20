// Utility action creators that are used in multiple places in the app.
import cookies from 'js-cookie';

import types from '../types';

/**
 * Thunk action creator that takes the server's store data and saves it into local redux store.
 * @param json
 */
export const handleStore = json => async dispatch => {
	let { session: { jwt, expire }, user: { birthday, ...user }, ...otherData } = json;
	await cookies.set('sessionJWT', jwt, { expires: new Date(Date.now() + expire) });
	
	// Process user - set birthdate to { year, month, date }
	birthday = new Date(birthday);
	user = {
		...user,
		birthdate: new Date(birthday)
	};
	
	dispatch({
		type: types.INIT_USER,
		payload: {
			user,
			...otherData
		}
	});
};
