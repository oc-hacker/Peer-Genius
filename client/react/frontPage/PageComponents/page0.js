import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import { Text } from '../../components';
import Page from './Page';

const styles = {
	buttons: {
		display: 'flex',
		flexDirection: 'column'
	}
};

@withStyles(styles)
export default class PageZero extends Component {
	static propTypes = {
		currentPage: PropTypes.number.isRequired,
		openLogIn: PropTypes.func.isRequired,
		createAccount: PropTypes.func.isRequired
	};
	
	render() {
		let { classes, currentPage, openLogIn, createAccount } = this.props;
		
		return (
			<Page
				page={0} currentPage={currentPage}
				bg="white"
			>
				<Text type="title">Peer Genius</Text>
				<Text type="subheading">Eliminate the Grind</Text>
				<div className={classes.buttons}>
					<Button
						raised color="primary"
						onClick={createAccount}
					>
						Create Account
					</Button>
					<Button
						raised color="primary"
						onClick={openLogIn}
					>
						Log In
					</Button>
				</div>
			</Page>
		);
	}
}