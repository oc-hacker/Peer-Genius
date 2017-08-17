import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { ReduxForm } from '../components/form';
import { CommunicationFields } from '../components';

const styles = {};

@withStyles(styles)
export default class CreateAccount extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<ReduxForm form="createAccount" onSubmit={console.log}>
				
				<CommunicationFields />
			</ReduxForm>
		);
	}
}