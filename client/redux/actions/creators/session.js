// Actions here are concerned with things related to the session jwt.
import cookies from 'js-cookie';
import httpStatus from 'http-status-codes';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import types from '../types';
import { post } from '../network';
import { handleStore } from './utils';


/**
 * Thunk action creator that takes in credentials and tries to log in the user
 * @param {{email: string, password: string}} credentials
 */
export const logIn = credentials => async dispatch => {
  let response = await post('/api/login', credentials);
  console.log(response);
  if (response.ok) {
    // Log in successful. Save store and redirect to user page.
    let json = await response.json();
    await dispatch(handleStore(json));
    console.log('finished dispatch');
    if (json.isGuru){
      dispatch(push('/guru'));
    } else {
      console.log('redirecting to newbie dashboard');
      dispatch(push('/newbie'));
    }
  }
  else if (response.status === httpStatus.UNAUTHORIZED) {
    // Throw login error. Let redux form handle error display.
    throw new SubmissionError({
      password: 'Password incorrect or email not found.'
    });
  }
  else {
    // Unexpected error
    dispatch({ type: types.UNEXPECTED_ERROR });
  }
};

/**
 * Thunk action creator that commands the deletion of stored user info to log out.
 */
export const logOut = () => async dispatch => {
  await cookies.remove('sessionJWT');
  dispatch({
    type: types.CLEAR_USER
  });
  dispatch(push('/'));
};

export const createAccount = values => async dispatch => {
  let { birthdate, ...otherValues } = values;
  birthdate = new Date(values.birthdate);

  // Send a POST request to create the account.
  const response = await post('/api/createAccount', {
    ...otherValues,
    birthday: {
      year: birthdate.getUTCFullYear(),
      month: birthdate.getUTCMonth(),
      date: birthdate.getUTCDate()
    }
  });

  if (response.ok) {
    // Account creation successful, save store and redirect to user page
    let json = await response.json();

    dispatch(handleStore(json));
    dispatch(push('/home'));
  }
  else if (response.status === httpStatus.CONFLICT) {
    throw new SubmissionError({
      email: 'This email has been taken.'
    });
  }
};

/**
 * Thunk action creator that uses the current JWT to fetch a new, refreshed JWT from server every time the JWT is about to expire.
 * @param expire The amount of time, in milliseconds, that the jwt will take to expire.
 */
export const refreshSession = expire => async dispatch => {
  let response = await post('/api/account/refresh');

  if (response.ok) {
    // JWT valid, save the new JWT.
    let json = await response.json();

    dispatch(handleStore(json));
    setTimeout(() => dispatch(refreshSession(expire)), expire * 0.9);
  }
  else {
    // JWT invalid, log out and return to front page.
    dispatch(logOut());
  }
};
