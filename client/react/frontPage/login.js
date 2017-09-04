import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';

import { connect } from 'react-redux';

import { Button } from '../components';
import { ReduxForm, TextField } from '../components/form';

import { logIn } from '../../redux/actions/creators/session';

const styles = ({ palette: { error, getContrastText } }) => ({
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between'
	},
	cancel: {
		backgroundColor: error[500],
		color: getContrastText(error[500]),
		'&:hover': {
			backgroundColor: error[700],
			color: getContrastText(error[700])
		}
	}
});

@connect(null, { logIn })
@withStyles(styles)
export default class LoginDialog extends Component {
	static propTypes = {
		open: PropTypes.bool,
		onRequestClose: PropTypes.func.isRequired
	};
	
	render() {
		let { classes, open, onRequestClose, logIn } = this.props;
		
		const labelWidth = '5em';
		
		return (
			<Dialog open={open} onRequestClose={onRequestClose}>
				<DialogTitle>Log In</DialogTitle>
				<DialogContent>
					<ReduxForm form="logIn" onSubmit={logIn}>
						<TextField
							name="email" label="Email" labelWidth={labelWidth}
						/>
						<TextField
							name="password" type="password" label="Password" labelWidth={labelWidth}
						/>
						<div className={classes.buttons}>
							<Button
								raised className={classes.cancel}
								onClick={onRequestClose}
							>
								Cancel
							</Button>
							<Button
								raised color="primary"
								type="submit"
							>
								Log In
							</Button>
						</div>
					</ReduxForm>
				</DialogContent>
			</Dialog>
		);
	}
}