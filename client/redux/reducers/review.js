import deepmerge from 'deepmerge';
import types from '../actions/types';

// review reducers

const defaultState = {
    reviews: {},
};

export default (state = defaultState, action) => {
    let { type, payload, meta, error } = action;
    let diff = {};

    switch (type) {
        default: {
            return state;
        }
        case types.GET_SESSION_REVIEWS: {
            diff = payload;
            break;
        }
        case types.GIVE_SESSION_REVIEW: {
            diff = payload;
            break;
        }
    }

    return deepmerge(state, diff || {});
};
