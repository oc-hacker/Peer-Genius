import React from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './react/main';

// Needed for MUI
injectTapEventPlugin();
// Render the app.
ReactDOM.render(
	App,
	document.getElementById('app')
);
