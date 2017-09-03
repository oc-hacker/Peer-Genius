import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { Text } from '../../components';
import Page from './Page';

const styles = {
	withColor: {
		backgroundColor: 'rgb(249,202,120)'
	},
	row: {
		display: 'flex',
		justifyContent: 'center'
	}
};

@withStyles(styles)
export default class PageTwo extends React.Component {
	static propTypes = {
		currentPage: PropTypes.number.isRequired
	};

	render() {
		let { classes, currentPage } = this.props;

		return (
			<Page
				page={2} currentPage={currentPage}
				className={classes.withColor}
			>
				<Text type="title">GURU BENEFITS</Text>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Text>
						- Gain volunteer service hours and have the chance to win the Presidential Volunteer Service Award (PVSA).
					</Text>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Text>
						- What is the PVSA? Click <a href="https://www.presidentialserviceawards.gov/">here</a> to find out more.
					</Text>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Text>
						- Use <a href="https://voluntu.io">voluntu.io</a> to log all of your hours.
					</Text>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Text>
						- Customize your profile with flexible times you are available to tutor.
					</Text>
				</div>
			</Page>
		);
	}
}
