import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Flex } from '../components';
import { mix } from '../utils/color';

const styles = ({ palette: { primary, accent, getContrastText }, spacing }) => ({
	tabTitle: {
		position: 'relative',
		width: 'fit-content',
		backgroundColor: primary[500],
		color: getContrastText(primary[500]),
		textTransform: 'uppercase',
		
		padding: `${spacing.unit}px ${spacing.unit * 2}px`,
		cursor: 'pointer',
		
		'&:after': {
			position: 'absolute',
			bottom: 0,
			left: '50%',
			right: '50%',
			transition: 'all 0.4s ease',
			
			content: '""',
			height: 3,
			backgroundColor: primary[100]
		},
		'&:hover::after': {
			left: 0,
			right: 0
		}
	},
	tabSelected: {
		'&:after': {
			left: 0,
			right: 0,
			backgroundColor: mix(primary[200], accent[200])
		}
	}
});

@withStyles(styles)
export default class TabTitles extends Component {
	static propTypes = {
		tabIndex: PropTypes.number.isRequired,
		setTab: PropTypes.func.isRequired
	};
	
	render() {
		let { classes, tabIndex, setTab } = this.props;
		
		return (
			<Flex justify="center">
				<div
					className={classNames(
						classes.tabTitle,
						{
							[classes.tabSelected]: tabIndex === 0
						}
					)}
					onClick={() => setTab(0)}
				>
					Subject
				</div>
				<div
					className={classNames(
						classes.tabTitle,
						{
							[classes.tabSelected]: tabIndex === 1
						}
					)}
					onClick={() => setTab(1)}
				>
					Time
				</div>
				<div
					className={classNames(
						classes.tabTitle,
						{
							[classes.tabSelected]: tabIndex === 2
						}
					)}
					onClick={() => setTab(2)}
				>
					Search
				</div>
			</Flex>
		);
	}
}