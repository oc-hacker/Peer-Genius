import React, { Component } from 'react';
import stylesheet from 'react-jss';

const styles = {
	flex: {
		display: 'flex',
		flexDirection: props => props.column ? 'column' : (props.direction || 'row'),
		alignItems: props => props.align || 'stretch',
		justifyContent: props => props.justify || 'flex-start'
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
		let { classes, column, direction, align, justify, ...divProps } = this.props;
		
		return (
			<div className={classes.flex} {...divProps} />
		);
	}
}