import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import { Text } from '../../components';
import Page from './Page';

import classNames from 'classnames';

const styles = {
	withColor: {
		backgroundColor: 'rgb(1,147,172)'
	},
	background: {
        backgroundImage: 'linear-gradient(to bottom, rgba(1,147,172, 0.9) 0%, rgba(1,147,172, 0.9) 100%), url(assets/home_page_4th.jpg)',
        backgroundSize: 'cover',
        overflow: 'hidden'
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
				<Text type="button" size='24pt' weight='bold'>The Guru</Text>
				<div className={classes.underlinedSection} />
				<div className={classes.pushDown}>
                </div>
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
