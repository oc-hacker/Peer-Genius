import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

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
export default class PageTwo extends Component {
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
				<Typography type="title">GURU BENEFITS</Typography>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Typography>
						- Gain volunteer service hours and have the chance to win the Presidential Volunteer Service Award (PVSA).
					</Typography>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Typography>
						- What is PVSA? Click <a href="https://www.presidentialserviceawards.gov/">here</a> to find out more.
					</Typography>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Typography>
						- Use <a href="https://voluntu.io">voluntu.io</a> to log all of your hours.
					</Typography>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Typography>
						- Customize your profile with flexible times you are available to tutor.
					</Typography>
				</div>
			</Page>
		);
	}
}