import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Flex from '../Flex';
import Text from '../Text';
import AccountMenu from './AccountMenu';
import AboutUs from './AboutUs';
import GuruMenu from './GuruMenu';
import NotificationsMenu from './NotificationsMenu';
import SessionsMenu from './SessionsMenu';
import Logo from '../Logo';

const styles = ({ palette: { primary, getContrastText }, spacing }) => ({
	appBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		boxSizing: 'border-box',
		padding: `${spacing.unit}px ${spacing.unit * 2}px`
	},
	logo: {
		width: 40,
		height: '100%',
		cursor: 'pointer'
	},
	appBarText: {
		color: getContrastText(primary[500]),
		padding: spacing.unit
	},
	appBarButton: {
		width: '5em'
	}
});

const UserAppBar =
	connect(null, { push })(
		withStyles(styles)(
			props => {
				let { className, classes, push } = props;
				
				return (
					<AppBar position="static" className={classNames(classes.appBar, className)}>
						<Flex align="center">
							<Logo
								className={classes.logo}
								onClick={() => push('/home')}
							/>
							<Text type="title" noSelect className={classes.appBarText}>Peer Genius</Text>
						</Flex>
						<Flex align="center">
							<GuruMenu />
							<AboutUs />
							<SessionsMenu />
							<NotificationsMenu />
							<AccountMenu />
						</Flex>
					</AppBar>
				);
			}
		)
	);

UserAppBar.displayName = 'UserAppBar';

export default UserAppBar;
