import { push } from 'react-router-redux';

import types from '../types';
import { post } from '../network';
import { handleError } from './utils';

/* Holds action creators for functions related to handling of PeerGenius reviews. */

export const getReviews = () => async dispatch => {
  let response = await post('/api/guru/reviews');

  if (response.ok) {
    let reviews = await response.json();

    dispatch({
      type: types.GET_SESSION_REVIEWS,
      payload: { reviews }
    });
  } else {
    dispatch(handleError(response));
  }
};

/**
 * Thunk action creator.
 * Sends review session POST request to the server.
 */
export const giveReview = (sessionId, rating, comment) => async dispatch => {
  let response = await post(`/api/session/review`, {
    session: sessionId,
    rating,
    comment
  });

  if (response.ok) {
    dispatch({
      type: types.GIVE_SESSION_REVIEW,
    });
    dispatch(push(`/newbie`));
  } else {
    dispatch(handleError(response));
  }
};
