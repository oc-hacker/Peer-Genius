import types from '../types';
import { post } from '../request';
import { handleStore } from './utils';

import httpStatus from 'http-status-codes';

/* Holds action creators for functions related to handling of PeerGenius reviews. */

export const getReviews = () => async dispatch => {
    let response = await post('/api/guru/reviews');

    if(response.ok){
        let reviews = await response.json();

        dispatch({
            type: types.GET_SESSION_REVIEWS,
            payload: { reviews }
        });
    } else {
        dispatch({ type: types.UNEXPECTED_ERROR });
    }
}

export const giveReview = () => async dispatch => {
    //TODO: finish and implement other stuff
    let response = await post('/api/newbie/:sessionUUID/review');

    if(response.ok){
        let review = await response.json();

        dispatch({
            type: types.GIVE_SESSION_REVIEW,
            payload: { review }
        });
    } else {
        dispatch({ type: types.UNEXPECTED_ERROR });
    }
}
