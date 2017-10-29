import types from '../types';
import { post } from '../network';
import { handleError } from './utils';
import { push } from 'react-router-redux';

// Redux action creators for guru actions


/**
 * Thunk action creator.
 * Fetches a guru's profile from the server.
 * @param {UUID} guruUUID the guru's UUID
 */
export const getGuruProfile = (guruUUID) => async dispatch => {
  let response = await post('/api/schedule/getPastSessions', { guruUUID });

  if (response.ok) {
    let guruProfile = await response.json();

    dispatch({
      type: types.INIT_GURU_PROFILE,
      payload: { guruProfile }
    });
  } else {
    dispatch({ type: types.UNEXPECTED_ERROR });
  }
};

/**
 * Thunk action creator.
 * Fetches a guru's reviews from the server.
 * @param guruUUID
 */
export const getGuruReviews = guruUUID => async dispatch => {
  let response = await post('/api/guru/getReviews', {
    guru: guruUUID
  });

  if (response.ok) {
    let { reviews } = await response.json();

    return await dispatch({
      type: types.INIT_GURU_REVIEWS,
      payload: {
        guruUUID,
        reviews
      }
    });
  }
  else {
    return await dispatch(handleError(response));
  }
};

/**
 * Updates the user's guru status for the given course;
 * @param user the user's UUID
 * @param courseID the ID of the course
 * @param enabled if the user should be allowed to be a guru for this course
 */
export const update = (user, courseId, enabled) => async dispatch => {
  let response = await post('/api/guru/update', {
    user, courseId, enabled
  });

  if (response.ok) {
    dispatch(push('/guru'));
  } else {
    return await dispatch(handleError(response));
  }
}