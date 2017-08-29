import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import { Text } from '../../components';
import Page from './Page';

const styles = {
	withColor: {
		backgroundColor: 'rgb(249,202,120)'
	},
};

@withStyles(styles)
export default class PageFour extends Component {
	static propTypes = {
		currentPage: PropTypes.number.isRequired,
		createAccount: PropTypes.func.isRequired
	};
	
	render() {
		let { classes, currentPage, createAccount } = this.props;
		
		return (
			<Page
				page={4} currentPage={currentPage}
				className={classes.withColor}
			>
				<Text type="subheading">Okay, Now that you get the idea behind PEER GENIUS...</Text>
				<Button
					raised
					color="primary"
					onClick={createAccount}
				>
					Create Account
				</Button>
			</Page>
		);
	}
}