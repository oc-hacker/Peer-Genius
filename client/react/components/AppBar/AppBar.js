import React, { Component } from 'react';
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

const styles = ({ palette: { primary, getContrastText }, spacing }) => ({
	appBar: {
		display: 'flex',
		boxSizing: 'border-box',
		padding: `${spacing.unit}px ${spacing.unit * 2}px`,
		flexDirection: 'row',
		justifyContent: 'space-between'
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

@connect(null, { push })
@withStyles(styles)
export default class CustomAppBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentMenu: null
		};
	}


	render() {
		let { className, classes, push } = this.props;

		return (
			<AppBar position="static" className={classNames(classes.appBar, className)}>
				<Flex align="center">
					<img
						src="/logo.svg"
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
}
