import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import {Text} from '../../components';
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
				<Text type="title">NEWBIE BENEFITS</Text>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Text>
						- Gain quality help for free.
					</Text>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Text>
						- Find your perfect guru by browsing guru profiles.
					</Text>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Text>
						- Book a tutoring session in 3 clicks.
					</Text>
				</div>
				<div className={classes.row}>
					<p>[Icon]</p>
					<Text>
						- After each session, rate your guru & write a review!
					</Text>
				</div>
			</Page>
		);
	}
}
