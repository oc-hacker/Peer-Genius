import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';

import Dialog from 'material-ui/Dialog';

import { connect } from 'react-redux';

const FormComponent = props => {
	let { handleSubmit, ...formProps } = props;
	
	return (
		<Form
			onSubmit={handleSubmit}
			{...formProps}
		/>
	);
};

const ReduxForm = props => {
	let { dialog, open, onRequestClose, form, formName, ...formProps } = props;
	
	let ConnectedForm = reduxForm({
		form: form || formName
	})(FormComponent);
	
	if (dialog) {
		return (
			<Dialog
				open={open}
				onRequestClose={onRequestClose}
			>
				<ConnectedForm {...formProps} />
			</Dialog>
		)
	}
	else {
		return (<ConnectedForm {...formProps} />)
	}
};

ReduxForm.propTypes = {
	form: props => {
		if (!props.form) {
			if (props.formName) {
				console.warn(`Form prop 'formName' is deprecated. Please use prop 'form' instead.`);
			}
			else {
				return new Error(`A form must be given a name.`);
			}
		}
	},
	formName: PropTypes.string,
	/** Whether the form is a dialog */
	dialog: PropTypes.bool,
	/** Only takes effect when the form is a dialog */
	open: PropTypes.bool,
	/** Only takes effect when the form is a dialog */
	onRequestClose: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object
};

export default ReduxForm;