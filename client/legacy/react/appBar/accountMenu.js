import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import AccountIcon from 'material-ui/svg-icons/action/account-circle';

import { connect } from 'react-redux';

export const options = {
	editProfile: 'editProfile',
	accountSettings: 'accountSettings',
	logout: 'logout'
};

const AccountMenu = props => {
	return (
		<IconMenu
			iconButtonElement={<IconButton style={{width: '100%', height: '100%'}}><AccountIcon /></IconButton>}
			anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
			targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
			tooltip="Account"
			{...props}
		>
			<MenuItem value={options.editProfile} primaryText="Edit Profile" />
			<MenuItem value={options.accountSettings} primaryText="Account Settings" />
			<MenuItem value={options.logout} primaryText="Logout" />
		</IconMenu>
	);
};

export default AccountMenu;