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
	}
	
	render() {
		let { push, logOut } = this.props;
		
		return (
			<AppBarMenu
				button={
					<AccountIcon />
				}
			>
				<MenuItem onClick={() => push('/accountSettings')}>Account Settings</MenuItem>
				<MenuItem onClick={() => push('/editProfile')}>Edit Profile</MenuItem>
				<MenuItem onClick={logOut}>Log Out</MenuItem>
			</AppBarMenu>
		);
	}
}