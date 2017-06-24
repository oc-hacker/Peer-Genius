import store from '../store.js';

import { createForm, sendFormVars } from './forms.js';

import { types } from '../../reference/actionTypes.js';

/**
 * Redux action generator for initializing user info.
 * 
 * @param  {Object} [userInfo] The user info object
 * @param  {String} [type] The account type; either 'student' or 'parent'
 * @return {Action} The initialize user info action
 */
export const initUserInfo = (userInfo, type) => ({
	type: types.INIT_USER_INFO,
	userInfo: {
		type: type ? type : userInfo.type,
		...userInfo
	}
});

/**
 * Redux Thunk action for initializing the user info form.
 */
export const initUserInfoForm = () => async dispatch => {
	console.log('Initializing User Info Form');
	// Copy everything from the userInfo object to the userInfo form
	dispatch(sendFormVars('userInfo', store.getState().userInfo));
}

/**
 * Redux action generator for updating the user info.
 * 
 * @param  {Object} [newInfo] The object with the new user info
 * @return {Action} The update user info action
 */
export const updateUserInfo = newInfo => ({
	type: types.UPDATE_USER_INFO,
	newInfo
});