import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				Hello world!
			</div>
		);
	}
}