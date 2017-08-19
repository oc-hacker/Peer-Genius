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
	}
	
	render() {
		return (
			<AppBarMenu
				button={
					'Gurus'
				}
			>
				<MenuItem>Become a Guru</MenuItem>
			</AppBarMenu>
		);
	}
}