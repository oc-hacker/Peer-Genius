import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { reduxForm, Form } from 'redux-form';

import { connect } from 'react-redux';

@reduxForm({})
export default class ReduxForm extends Component {
	static propTypes = {
		form: PropTypes.string.isRequired,
		/**
		 * @param values
		 * @param dispatch
		 */
		onSubmit: PropTypes.func.isRequired,
		initialValues: PropTypes.object
	};
	
	render() {
		let {
			handleSubmit, // Relevant props
			anyTouched, asyncValidate, asyncValidating, blur, change, destroy, dirty, dispatch, error, initialize, initialized, initialValues, invalid, pristine, reset, submitting, submitFailed,
			submitSucceeded, touch, untouch, valid, warning, pure, triggerSubmit, autofill, clearSubmit, clearSubmitErrors, clearAsyncError, submit, array,// Injected by redux-form
			...formProps
		} = this.props;
		
		return (
			<Form {...formProps} onSubmit={handleSubmit} />
		);
	}
}