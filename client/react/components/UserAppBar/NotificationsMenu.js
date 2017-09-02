import React, { Component } from 'react';

import { NotificationsNone } from 'material-ui-icons/NotificationsNone';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBarMenu from './AppBarMenu';

@connect(null, { push })
export default class SessionsMenu extends Component {
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
	
	_toFeed = () => {
		//this.props.push('');
	};
	
	render() {
		let { open } = this.state;
		return (
			<AppBarMenu
				button={'Notifications'}
				open={open} onClick={this._toFeed} onRequestClose={this._closeMenu}
			/>
		);
	}
}
