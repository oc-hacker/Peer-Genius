import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Flex } from '../../components';
import { tabControl } from '../../components/tabs';

const styles = ({ palette: { primary, accent, getContrastText }, spacing }) => ({
	title: {
		backgroundColor: primary[500],
		color: getContrastText(primary[500]),
		transition: 'all 0.3s ease',
		
		position: 'relative',
		padding: `${spacing.unit}px ${spacing.unit * 2}px`,
		
		textAlign: 'center',
		textTransform: 'uppercase',
		cursor: 'pointer',
		
		'&:after': {
			height: 3,
			content: '""',
			backgroundColor: primary[200],
			position: 'absolute',
			bottom: 0,
			left: '50%',
			right: '50%',
			transition: 'all 0.3s ease'
		},
		
		'&:hover': {
			backgroundColor: primary[700],
			color: getContrastText(primary[700]),
			'&:after': {
				left: 0,
				right: 0
			}
		}
	},
	active: {
		'&:after': {
			left: 0,
			right: 0,
			backgroundColor: accent['A400']
		}
	}
});

@tabControl
@withStyles(styles)
export default class Control extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let { currentTab, tabTitles, setTab, classes, ...others } = this.props;
		
		return (
			<Flex justify="center" {...others}>
				{tabTitles.map((title, index) => (
					<div
						className={classNames(
							classes.title,
							{
								[classes.active]: currentTab === index
							}
						)}
						onClick={() => setTab(index)}
					>
						{title}
					</div>
				))}
			</Flex>
		);
	}
}