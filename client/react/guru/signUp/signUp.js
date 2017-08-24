import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { SubjectFields } from '../../components';
import { ReduxForm } from '../../components/form';

export default class SignUp extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<ReduxForm form="f" onSubmit={console.log}>
				<SubjectFields />
			</ReduxForm>
		);
	}
}