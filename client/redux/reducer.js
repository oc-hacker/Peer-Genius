import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';

// Create and export the main reducer from combining all sub-reducers.
const appReducer = combineReducers({
	routing
});

export default appReducer;