import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { logout } from '../redux/actions/session.js';

import { grey100, grey400 } from 'material-ui/styles/colors';
import MuiAppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import AccountIcon from 'material-ui/svg-icons/action/account-circle.js';
import HoursIcon from 'material-ui/svg-icons/action/alarm-on.js';
import OrganizationsIcon from 'material-ui/svg-icons/social/people.js';
import CalendarIcon from 'material-ui/svg-icons/action/date-range.js';
import PhotosIcon from 'material-ui/svg-icons/image/photo.js';
import HelpIcon from 'material-ui/svg-icons/action/help-outline.js';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications.js'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app.js';

const style = {
	appBar: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		display: 'flex'
	},
	transparentAppBar: {
		backgroundColor: 'transparent',
		boxShadow: 'none',
	},
	title: {
		// cursor: 'pointer',
		flexGrow: 0.2
	},
	button: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 12,
		marginBottom: 15
	},
	iconButton: {
		marginLeft: 12,
		marginRight: 12,
		marginTop: 6,
		marginBottom: 6,
		padding: 0
	},
	icon: {
		height: 40,
		width: 40
	},
	logo: {
		cursor: 'pointer'
	},
	badge: {
		padding: 0
	}
};

/**
 * @classdesc The AppBar at the top of the page
 */
@connect(state => ({
	inSession: state.inSession
}), dispatch => ({
	pushToFrontPage: () => {
		dispatch(push('/'));
	},
	pushToHome: () => {
		dispatch(push('/home'))
	},
	pushToEditAccount: () => {
		dispatch(push('/account/edit'));
	},
	logout: () => {
		dispatch(logout());
	}
}))
export default class AppBar extends React.Component {
	_accountHandler = (event, value) => {
		if (value === 0) {
			this.props.pushToEditAccount();
		} else if (value === 1) {
		
		} else if (value === 2) {
			this.props.logout();
		}
	};
	
	render() {
		return this.props.inSession === 1 ? (
			<MuiAppBar
				iconElementLeft={<img src="/logo.svg" style={style.logo} width={64} height={45}/>}
				style={style.appBar}
				titleStyle={style.title}
				onLeftIconButtonTouchTap={this.props.pushToHome}
			>
				<div style={{flexGrow: 2}}/>
				
				<IconMenu
					iconButtonElement={<IconButton><AccountIcon /></IconButton>}
					onChange={this._accountHandler}
					anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					style={style.iconButton}
					iconStyle={style.icon}
					tooltip="Account"
				>
					<MenuItem value={0} primaryText="Edit Profile"/>
					<MenuItem value={1} primaryText="Account Settings"/>
					<MenuItem value={2} primaryText="Logout"/>
				</IconMenu>
			</MuiAppBar>
		) : (
			<MuiAppBar
				iconElementLeft={<img src="/logo.svg" style={style.logo} width={64} height={45}/>}
				style={{...style.appBar, ...style.transparentAppBar}}
				titleStyle={style.title}
				onLeftIconButtonTouchTap={this.props.pushToHome}
			/>
		)
	}
};