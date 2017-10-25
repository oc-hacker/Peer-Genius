// Mostly housekeeping actions that should be called upon initialization or login.
import cookies from 'js-cookie';

import types from '../types';
import { get, post } from '../network';
import { handleError, handleStore } from './utils';

/**
 * Thunk action creator.
 * Called upon page load. Fetches communication methods, available subjects, and server configuration.
 */
export const initialize = () => async dispatch => {
  dispatch({ type: types.INIT_START });

  // Retrieve basic server information
  let [
    courseResponse,
    configResponse,
  ] = await Promise.all([
    post('/api/course/list'),
    get('/api/config')
  ]);

  if (courseResponse.ok && configResponse.ok) {
    let courses = await courseResponse.json();
    let serverConfig = await configResponse.json();

    dispatch({
      type: types.INIT_CONFIG,
      payload: {
        courses,
        serverConfig
      }
    });
  }

  // If logged in, retrieve user information
  if (cookies.get('sessionJWT')) {
    let response = await post('/api/account/info');

    if (response.ok) {
      // JWT still valid
      let json = await response.json();
      await dispatch(handleStore(json));
    }
    else {
      await dispatch(handleError(response));
    }
  }

  dispatch({ type: types.INIT_END });
};
