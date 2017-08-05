import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';

const styles = {
	buttonContainer: {
		display: 'inline',
		marginLeft: 10
	}
};

const HonorCode = stylesheet(styles)(props => {
	let { open, onAccept, onDecline, classes } = props;
	
	return (
		<Dialog
			modal
			open={open}
			title="Before You Join..."
			actions={[
				<div className={classes.buttonContainer}>
					<RaisedButton
						secondary
						label="Decline"
						onTouchTap={onDecline}
						style={{ marginLeft: 10 }}
					/>
				</div>,
				<div className={classes.buttonContainer}>
					<RaisedButton
						primary
						label="Accept"
						onTouchTap={onAccept}
						style={{ marginLeft: 10 }}
					/>
				</div>
			]}
		>
			Insert honor code here.
		</Dialog>
	);
});

HonorCode.propTypes = {
	open: PropTypes.bool.isRequired,
	onAccept: PropTypes.func.isRequired,
	onDecline: PropTypes.func.isRequired
};

export default HonorCode;