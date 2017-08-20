import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
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
	
	render() {
		let { open } = this.state;
		
		return (
			<AppBarMenu
				button={
					'Gurus'
				}
				open={open} onClick={this._openMenu} onRequestClose={this._closeMenu}
			>
				<MenuItem>Become a Guru</MenuItem>
				<MenuItem>Guru Requests</MenuItem>
			</AppBarMenu>
		);
	}
}