import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';

import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';

const FormSubmitButton = stylesheet({
	toolbar: {
		display: 'flex'
	},
	grow: {
		flexGrow: 1
	}
})(props => {
	let { classes, reset, ...others } = props;
	return (
		<div className={classes.toolbar}>
			{reset && <RaisedButton
				secondary
				label="Reset"
				onTouchTap={reset}
			/>}
			<div className={classes.grow} />
			<RaisedButton
				primary
				type="submit"
				{...others}
			/>
		</div>
	);
});

FormSubmitButton.propTypes = {
	label: PropTypes.string,
	onTouchTap: PropTypes.string,
	reset: PropTypes.func
};

export default FormSubmitButton;