import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

const styles = ({ palette: { accent }, spacing }) => ({
	root: {
		width: 8,
		height: 8,
		margin: `${spacing.unit}px 0`,
		
		borderRadius: '50%',
		borderWidth: 2,
		borderColor: '#8d8c88',
		borderStyle: 'solid',
		
		cursor: 'pointer'
	},
	selected: {
		backgroundColor: '#252525',
		borderColor: '#252525'
	},
	firstPage: {
		backgroundColor: '#959595',
		borderColor: '#959595'
	},
	firstPageSelected: {
		backgroundColor: '#f5c77c',
		borderColor: '#f5c77c'
	}
});

@withStyles(styles)
export default class Radio extends Component {
	static propTypes = {
		selected: PropTypes.bool,
		firstPage: PropTypes.bool // Whether we are at the first page
	};
	
	render() {
		let { className, classes, selected, firstPage, ...others } = this.props;
		
		return (
			<div
				className={classNames(
					classes.root,
					{
						[classes.selected]: selected,
						[classes.firstPage]: firstPage,
						[classes.firstPageSelected]: firstPage && selected
					},
					className
				)}
				{...others}
			/>
		);
	}
}