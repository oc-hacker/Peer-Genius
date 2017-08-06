import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, reduxForm } from 'redux-form';
import stylesheet from 'react-jss';

import Dialog from 'material-ui/Dialog';

import { connect } from 'react-redux';

import styles from './styles';

const StyledForm = stylesheet(styles)(props => {
	const { dialog, dialogProps, className, classes, ...others } = props;
	
	if (dialog) {
		return (
			<Dialog {...dialogProps}>
				<Form {...others}/>
			</Dialog>
		);
	}
	else {
		return (
			<Form
				className={className ? classes.form + ' ' + className : classes.form}
				{...others}
			/>
		);
	}
});

StyledForm.propTypes = {
	dialog: PropTypes.bool,
	dialogProps: PropTypes.shape(Dialog.propTypes)
};

export default StyledForm;
