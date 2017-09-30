// Utility action creators that are used in multiple places in the app.
import cookies from 'js-cookie';
import httpStatus from 'http-status-codes';
import { push } from 'react-router-redux';

import types from '../types';
import { socketConnect } from './socket';

/**
 * Thunk action creator.
 * Takes the server's store data and saves it into local redux store.
 * @param json
 */
export const handleStore = json => async dispatch => {
  let { session: { jwt, expire }, user: { birthday, ...user }, isGuru, ...otherData } = json;
  await cookies.set('sessionJWT', jwt, { expires: new Date(Date.now() + expire) });

  // Process user - server stores birthday in UTC, without timezone conversion, so the UTC values are the actually correct values.
  birthday = new Date(birthday);
  user = {
    ...user,
    birthdate: new Date(birthday.getUTCFullYear(), birthday.getUTCMonth(), birthday.getUTCDate()),
    isGuru
  };

  dispatch({
    type: types.INIT_USER,
    payload: {
      user,
      ...otherData
    }
  });

  // Connect sockets
  dispatch(socketConnect(jwt));
};

/**
 * Thunk action creator.
 * Checks the response against some preconfigured error responses.
 * @param response
 */
export const handleError = response => async dispatch => {
  if (response.status === httpStatus.UNAUTHORIZED) {
    let json = await response.json();
    if (json.reason === 'Invalid session') {
      // JWT is invalid. Delete it and redirect to front page.
      cookies.remove('sessionJWT');
      dispatch(push('/'));
    }
    else {
      dispatch({ type: types.UNEXPECTED_ERROR });
    }
  }
  else {
    dispatch({ type: types.UNEXPECTED_ERROR });
  }
};
