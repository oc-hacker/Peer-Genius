import types from '../types';
import { post } from '../request';
import { handleError, handleStore } from './utils';

import htttpStatus from 'http-status-codes';

// Redux action creators for guru actions


/**
 * Fetches a guru's profile from the server.
 * @param {UUID} guruUUID the guru's UUID
 */
export const getGuruProfile = (guruUUID) => async dispatch => {
    let response = await post('/api/schedule/getPastSessions', { guruUUID: guruUUID });

    if(response.ok){
        let guruProfile = await response.json();

        dispatch({
            type: types.INIT_GURU_PROFILE,
            payload: { guruProfile }
        });
    } else {
        dispatch({ type: types.UNEXPECTED_ERROR });
    }
}
