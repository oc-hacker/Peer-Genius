import React, { Component } from 'react';
import classNames from 'classnames';
import stylesheet from 'react-jss';

const styles = {
	flex: {
		display: 'flex',
		flexDirection: props => props.column ? 'column' : (props.direction || 'row'),
		alignItems: props => props.align || 'stretch',
		justifyContent: props => props.justify || 'flex-start',
		flexGrow: props => props.grow || 0,
		flexShrink: props => props.shrink || 0
	}
};

@stylesheet(styles)
/**
 * A component for flexbox purposes.
 */
export default class Flex extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		// Destruct and take out extra props.
		let {
			className, classes, sheet,
			column, direction, align, justify, grow, shrink,
			...divProps
		} = this.props;
		
		return (
			<div className={classNames(classes.flex, className)} {...divProps} />
		);
	}
}