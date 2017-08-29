import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { Text } from '../../components';
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
		textTransform: 'uppercase',
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
					<Text
						type="subheading" align="center" color="white"
						className={classes.title}
					>
						What is peer genius?
					</Text>
				</div>
				<Text type="subheading">A web platform where students teach other students to:</Text>
				<div className={classes.body}>
					<div className={classes.column}>
						<p>[Insert Picture Here]</p>
						<Text type="body1">Save money while learning</Text>
					</div>
					<div className={classes.column}>
						<p>[Insert Picture Here]</p>
						<Text type="body1">Gain community service hours while learning</Text>
					</div>
					<div className={classes.column}>
						<p>[Insert Picture Here]</p>
						<Text type="body1">Network with actual people</Text>
					</div>
				</div>
			</Page>
		);
	}
}