import fetch from 'isomorphic-fetch';

import cookie from 'js-cookie';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import { sendFormErr } from './forms.js';
import { initUserInfo } from './userInfo.js';

import { types } from '../../reference/actionTypes.js';

import { serverURL, sessionJWTExpire } from '../../config.js';

/**
 * Thunk action creator for verifying sessions.
 *
 * @param {Boolean} [requestInfo] Whether to request account info as well, or just to verify.  Requesting account info should only be done on initial loading of the page.
 * @return {Boolean} Whether the user is in session.
 */
export const verifySession = requestInfo => async dispatch => {
	// Dispatch action marking start of request.
	dispatch({
		type: types.VERIFY_SESSION,
		status: types.REQUEST
	});
	
	// Load the sessionJWT cookie.
	let sessionJWT = cookie.get('sessionJWT');
	
	if (!sessionJWT) {
		// If there is no cookie, then the user is not in session; dispatch an action marking the failure and return false.
		dispatch({
			type: types.VERIFY_SESSION,
			status: types.FAILURE
		});
		
		return false;
	}
	
	// Otherwise, fetch from the server to verify whether the JWT is valid.
	// Use /api/account/info for info requests, and /api/account/verify for verification only.
	let fetchURL = serverURL + (requestInfo ? '/api/account/info' : '/api/account/verify');
	const response = await fetch(fetchURL, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	});
	
	if (response.ok) {
		if (requestInfo) {
			const json = await response.json();
			
			// Initialize all account info
			dispatch(initUserInfo({...json.account, ...json.user}));
		}
		
		dispatch({
			type: types.VERIFY_SESSION,
			status: types.SUCCESS
		});
		
		// Refresh the session.
		await dispatch(refreshSession());
	} else {
		dispatch({
			type: types.VERIFY_SESSION,
			status: types.FAILURE
		});
	}
	
	// Return whether the session JWT was valid.
	return response.ok;
};

/**
 * Thunk action creator for refreshing sessions.
 */
export const refreshSession = () => async dispatch => {
	dispatch({
		type: types.REFRESH_SESSION,
		status: types.REQUEST
	});
	
	// Load the sessionJWT cookie.
	let sessionJWT = cookie.get('sessionJWT');
	
	if (!sessionJWT) {
		// If there is no cookie, then the user is not in session; dispatch an action marking the failure.
		dispatch({
			type: types.REFRESH_SESSION,
			status: types.FAILURE
		});
		
		return;
	}
	
	// Send a POST request to check the JWT
	const response = await fetch(serverURL + '/api/account/refresh', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	});
	console.log(response);
	
	if (response.ok) {
		let json = await response.json();
		
		// If the check succeeded, save the cookie.
		await cookie.set('sessionJWT', json.sessionJWT, {expires: sessionJWTExpire});
		
		// Dispatch an action to mark the success and store the session JWT.
		dispatch({
			type: types.REFRESH_SESSION,
			status: types.SUCCESS
		});
		
		// Set a session refresh to happen before the JWT expires
		setTimeout(() => {
			dispatch(refreshSession());
		}, sessionJWTExpire * 9 / 10);
	} else {
		// If the check failed, remove the cookie
		await cookie.remove('sessionJWT');
		
		// Dispatch an action to mark the failure.
		dispatch({
			type: types.REFRESH_SESSION,
			status: types.FAILURE
		});
		
		// Call verify session to update
		dispatch(verifySession());
	}
};

/**
 * Thunk action creator for logging in.
 */
export const login = (credentials) => async dispatch => {
		// If the credentials exists, dispatch an action marking the start of the login request.
		dispatch({
			type: types.LOGIN,
			status: types.REQUEST
		});
		
		// Send a POST request to verify the login.
		const response = await fetch(serverURL + '/api/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: credentials.username,
				password: credentials.password
			})
		});
		
		if (response.ok) {
			let json = await response.json();
			
			dispatch({
				type: types.LOGIN,
				status: types.SUCCESS
			});
			
			// If the login succeeds, save the cookie.
			await cookie.set('sessionJWT', json.sessionJWT, {expires: sessionJWTExpire});
			
			// Initialize all account info in the Redux store
			dispatch(initUserInfo(json.userInfo));
			
			// Set a session refresh to happen right before the JWT expires
			setTimeout(() => {
				dispatch(refreshSession());
			}, sessionJWTExpire * 9 / 10);
			
			dispatch(push('/home'))
		} else {
			dispatch({
				type: types.LOGIN,
				status: types.FAILURE
			});
			
			// If login fails, send an error to the form.
			if (response.status === 400) {
				throw new SubmissionError({
					email: 'No account with this email exists.'
				});
			}
			else if (response.status === 401) {
				throw new SubmissionError({
					password: 'Wrong password.'
				});
			}
			else {
				throw new SubmissionError({
					email: 'Unexpected error when contacting server.'
				});
			}
		}
};

/**
 * Thunk action creator for logging out.
 */
export const logout = () => async dispatch => {
	// Remove the session JWT cookie.
	await cookie.remove('sessionJWT');
	
	// Dispatch an action to reset the redux store to be blank.
	dispatch({
		type: types.RESET
	});
	
	// Dispatch an action to refresh the session, and then push to front page.
	dispatch({
		type: types.LOGOUT
	});
	
	dispatch(push('/'));
};