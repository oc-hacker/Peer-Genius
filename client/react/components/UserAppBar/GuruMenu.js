import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBarMenu from './AppBarMenu';

@connect(null, { push })
export default class GuruMenu extends Component {
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
	
	_toGuruSignUp = () => {
		this.props.push('/guru/signUp');
	};
	
	render() {
		let { open } = this.state;
		
		return (
			<AppBarMenu
				button={'Gurus'}
				open={open} onClick={this._openMenu} onRequestClose={this._closeMenu}
			>
				<MenuItem onClick={this._toGuruSignUp}>Become a Guru</MenuItem>
				<MenuItem>Guru Requests</MenuItem>
			</AppBarMenu>
		);
	}
}