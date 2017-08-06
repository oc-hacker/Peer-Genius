import React from 'react';

import { Switch, Route } from 'react-router';

import EditProfile from './edit/profile';
import AccountSettings from './edit/settings/index';

const AccountRouter = props => (
	<Switch>
		<Route path={`${props.match.url}/edit`} component={EditProfile} />
		<Route path={`${props.match.url}/settings`} component={AccountSettings} />
	</Switch>
);

export default AccountRouter;
