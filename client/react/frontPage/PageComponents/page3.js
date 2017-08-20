import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import Page from './Page';

const styles = {
	withColor: {
		backgroundColor: 'rgb(1,147,172)'
	},
	row: {
		display: 'flex',
		justifyContent: 'center'
	}
};

@withStyles(styles)
export default class PageThree extends Component {
	static propTypes = {
		currentPage: PropTypes.number.isRequired
	};
	
	render() {
		let { classes, currentPage } = this.props;
		
		return (
			<Page
				page={3} currentPage={currentPage}
				className={classes.withColor}
			>
				<Typography type="title">NEWBEE BENEFITS</Typography>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Typography>
						- Gain quality help for free.
					</Typography>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Typography>
						- Find your perfect guru by browsing guru profiles.
					</Typography>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Typography>
						- Book a tutoring session in 3 clicks.
					</Typography>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Typography>
						- After each session, rate your guru & write a review!
					</Typography>
				</div>
			</Page>
		);
	}
}