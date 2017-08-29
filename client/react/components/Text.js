import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';
import classNames from 'classnames';

import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { connect } from 'react-redux';

const styles = {
	text: {
		color: props => {
			let { palette } = props.theme;
			if (palette.hasOwnProperty(props.color)) {
				return palette[props.color][props.tone];
			}
			else {
				return props.color;
			}
		},
		fontSize: props => props.size,
		fontWeight: props => props.weight,
		cursor: props => props.noSelect ? 'default' : 'auto'
	}
};

const Text =
	withTheme(
		stylesheet(styles)(
			props => {
				// Take out extra props using destructure
				let {
					classes: { text, ...classes }, className, color, tone, size, weight, noSelect,
					...others
				} = props;
				
				return (
					<Typography
						className={classNames(text, className)}
						classes={classes}
						{...others}
					/>
				);
			}
		)
	);

// Prop types copied from MUI Typography prop types
Text.propTypes = {
	align: PropTypes.string,
	className: PropTypes.string,
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	color: PropTypes.string,
	gutterBottom: PropTypes.bool,
	headlineMapping: PropTypes.objectOf(PropTypes.string),
	noSelect: PropTypes.bool,
	noWrap: PropTypes.bool,
	paragraph: PropTypes.bool,
	size: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
	type: PropTypes.oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button']),
	tone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	weight: PropTypes.number
};

Text.defaultProps = {
	tone: 500
};

export default Text;