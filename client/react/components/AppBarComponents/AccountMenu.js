import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui-icons/AccountCircle';
import { MenuItem } from 'material-ui/Menu';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBarMenu from './AppBarMenu';

import { logOut } from '../../../redux/actions/creators/session';

@connect(null, {
	push,
	logOut
})
export default class AccountMenu extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			open: false
		};
	}
	
	_openMenu = () => {
		this.setState({
			open: true
		});
	};
	
	_closeMenu = () => {
		this.setState({
			open: false
		});
	};
	
	_toAccountSettings = () => {
		this.props.push('/account/settings');
		this._closeMenu();
	};
	
	_toEditProfile = () => {
		this.props.push('/account/profile');
		this._closeMenu();
	};
	
	render() {
		let { logOut } = this.props;
		let { open } = this.state;
		
		return (
			<AppBarMenu
				button={
					<AccountIcon />
				}
				open={open} onClick={this._openMenu} onRequestClose={this._closeMenu}
			>
				<MenuItem onClick={this._toAccountSettings}>Account Settings</MenuItem>
				<MenuItem onClick={this._toEditProfile}>Edit Profile</MenuItem>
				<MenuItem onClick={logOut}>Log Out</MenuItem>
			</AppBarMenu>
		);
	}
}