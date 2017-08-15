import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { logout } from '../../redux/actions/session.js';
import MuiAppBar from 'material-ui/AppBar';

import AccountMenu, { options as accountOptions } from './accountMenu';
import AboutUs from './aboutUs';
import Gurus from './gurus';

const style = {
	appBar: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		display: 'flex',
		paddingRight: 0
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
	menuHeader: {
		width: 160,
		height: 64,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	icon: {
		height: 40,
		width: 40,
		color: 'white',
		paddingBottom: 12
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
		dispatch(push('/home'));
	},
	pushToEditAccount: () => {
		dispatch(push('/account/edit'));
	},
	pushToEditSettings: () => {
		dispatch(push('/account/settings'))
	},
	logout: async () => {
		await dispatch(logout());
		dispatch(push('/'))
	}
}))
export default class AppBar extends React.Component {
	_accountHandler = (event, value) => {
		const { pushToEditAccount, pushToEditSettings, logout } = this.props;
		
		switch (value) {
			case accountOptions.editProfile: {
				return pushToEditAccount();
			}
			case accountOptions.accountSettings: {
				return pushToEditSettings();
			}
			case accountOptions.logout: {
				return logout();
			}
		}
	};
	
	render() {
		return this.props.inSession === 1 ? (
			<MuiAppBar
				iconElementLeft={<img src="/logo.svg" style={style.logo} width={64} height={45} />}
				style={style.appBar}
				titleStyle={style.title}
				onLeftIconButtonTouchTap={this.props.pushToHome}
			>
				<div style={{ flexGrow: 2 }} />
				
				<Gurus
					style={style.menuHeader}
				/>
				<AboutUs
					style={style.menuHeader}
				/>
				<AccountMenu
					onChange={this._accountHandler}
					style={style.menuHeader}
					iconStyle={style.icon}
				/>
			</MuiAppBar>
		) : (
			<MuiAppBar
				iconElementLeft={<img src="/logo.svg" style={style.logo} width={64} height={45} />}
				style={{ ...style.appBar, ...style.transparentAppBar }}
				titleStyle={style.title}
				onLeftIconButtonTouchTap={this.props.pushToHome}
			/>
		);
	}
};