import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

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
				<Typography type="subheading">Okay, Now that you get the idea behind PEER GENIUS...</Typography>
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