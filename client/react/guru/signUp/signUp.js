import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { SubjectFields } from '../../components';

export default class SignUp extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<SubjectFields />
		);
	}
}