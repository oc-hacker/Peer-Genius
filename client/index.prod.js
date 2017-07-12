import React from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';

import App from './react/main';

// Needed for MUI
injectTapEventPlugin();
// Render the app.
ReactDOM.render(
	<AppContainer>
		{App}
	</AppContainer>,
	document.getElementById('app')
);

// Hot Module Replacement
if (module.hot) {
	module.hot.accept('./react/main', () => {
		const NextApp = require('./react/main').default;
		ReactDOM.render(
			<AppContainer>
				{NextApp}
			</AppContainer>,
			document.getElementById('app')
		)
	})
}
