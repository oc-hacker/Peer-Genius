import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

const styles = ({ palette: { error } }) => ({
	decline: {
		color: error[500],
		'&:hover': {
			backgroundColor: fade(error['A200'], 0.12),
		}
	}
});

@withStyles(styles)
export default class HonorCodeDialog extends Component {
	static propTypes = {
		open: PropTypes.bool,
		onAccept: PropTypes.func.isRequired,
		onDecline: PropTypes.func.isRequired
	};
	
	render() {
		let { classes, open, onAccept, onDecline } = this.props;
		
		return (
			<Dialog open={open}>
				<DialogTitle>
					Peer Genius Honor Code
				</DialogTitle>
				<DialogContent>
					Insert honor code here.
				</DialogContent>
				<DialogActions>
					<Button className={classes.decline} onClick={onDecline}>
						Decline
					</Button>
					<Button color="primary" onClick={onAccept}>
						Accept
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}