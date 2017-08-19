import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

export default class HonorCodeDialog extends Component {
	static propTypes = {
		open: PropTypes.bool,
		onAccept: PropTypes.func.isRequired,
		onDecline: PropTypes.func.isRequired
	};
	
	render() {
		let { open, onAccept, onDecline } = this.props;
		
		return (
			<Dialog open={open}>
				<DialogTitle>
					Peer Genius Honor Code
				</DialogTitle>
				<DialogContent>
					Insert honor code here.
				</DialogContent>
				<DialogActions>
					<Button color="accent" onClick={onDecline}>
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