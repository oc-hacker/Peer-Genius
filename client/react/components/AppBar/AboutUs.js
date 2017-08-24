import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBarMenu from './AppBarMenu';

@connect(null, { push })
export default class AboutUs extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { push } = this.props;
		
		return (
			<AppBarMenu
				button={
					'About Us'
				}
				onClick={() => push('/aboutUs')}
			/>
		);
	}
}