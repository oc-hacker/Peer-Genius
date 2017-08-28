import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import stylesheet from 'react-jss';

const styles = {
	flex: {
		display: 'flex',
		flexDirection: props => props.column ? 'column' : (props.direction || 'row'),
		alignItems: props => props.align || 'stretch',
		justifyContent: props => props.justify || 'flex-start',
		flexGrow: props => props.grow || 0,
		flexShrink: props => props.shrink || 0,
		flexBasis: props => props.basis || 'auto'
	}
};

@stylesheet(styles)
/**
 * A component for flexbox purposes.
 */
export default class Flex extends Component {
	static propTypes = {
		component: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
	};
	
	static defaultProps = {
		component: 'div'
	};
	
	render() {
		// Destruct and take out extra props.
		let {
			className, classes, sheet,
			column, direction, align, justify, grow, shrink, basis,
			component: Component, rootRef,
			...componentProps
		} = this.props;
		
		return (
			<Component
				ref={rootRef}
				className={classNames(classes.flex, className)}
				{...componentProps}
			/>
		);
	}
}