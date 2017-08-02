import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';

import Dialog from 'material-ui/Dialog';

import { connect } from 'react-redux';

const StyledForm = props => {
	const { dialog, dialogProps, ...others } = props;
	
	if (dialog) {
		return (
			<Dialog {...dialogProps}>
				<Form {...others} />
			</Dialog>
		);
	}
	else {
		return (
			<Form {...props} />
		);
	}
};

StyledForm.propTypes = {
	dialog: PropTypes.bool,
	dialogProps: PropTypes.shape(Dialog.propTypes)
};

export default StyledForm;
