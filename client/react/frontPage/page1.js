import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

import Page from './Page';

const styles = {
	withColor: {
		backgroundColor: 'rgb(1,147,172)'
	},
	button: {
		position: 'absolute',
		bottom: '100%',
		width: '100%',
		padding: '0.5em',
		cursor: 'pointer',
	},
	title: {
		textAlign: 'center',
		textTransform: 'uppercase',
		color: 'white'
	},
	body: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
};

@withStyles(styles)
export default class PageOne extends Component {
	static propTypes = {
		currentPage: PropTypes.number.isRequired,
		next: PropTypes.func.isRequired
	};
	
	render() {
		let { classes, currentPage, next } = this.props;
		
		return (
			<Page
				page={1} currentPage={currentPage}
				className={classes.withColor}
			>
				<div
					className={classNames(classes.button, classes.withColor)}
					onClick={next}
				>
					<Typography
						type="subheading"
						classes={{ subheading: classes.title }}
					>
						What is peer genius?
					</Typography>
				</div>
				<Typography type="subheading">A web platform where students teach other students to:</Typography>
				<div className={classes.body}>
					<div className={classes.column}>
						<p>[Insert Picture Here]</p>
						<Typography type="body1">Save money while learning</Typography>
					</div>
					<div className={classes.column}>
						<p>[Insert Picture Here]</p>
						<Typography type="body1">Gain community service hours while learning</Typography>
					</div>
					<div className={classes.column}>
						<p>[Insert Picture Here]</p>
						<Typography type="body1">Network with actual people</Typography>
					</div>
				</div>
			</Page>
		);
	}
}