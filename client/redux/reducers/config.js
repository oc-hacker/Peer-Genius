import deepmerge from 'deepmerge';

import types from '../actions/types';

const defaultState = {
    communicationMethods: {},
    subjects: {},
    serverConfig: {
        devMode: false
    }
};

export default (state = defaultState, action) => {
    let { type, payload, meta, error } = action;
    let diff = {};

    // Generally reducers will use `diff` to apply changes to state. Occassionally the reducer may return state directly to, for example, remove a certain attribute.
    switch (type) {
        default: {
            return state;
        }
        case types.INIT_CONFIG: {
            diff = payload;
            break;
        }
    }

    return deepmerge(state, diff || {});
}
