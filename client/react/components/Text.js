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
			let { color, shade, palette } = props.theme;
			
			if (color in palette) {
				return palette[color][shade];
			}
			else {
				return color;
			}
		},
		fontSize: props => props.size,
		fontWeight: props => props.weight,
		cursor: props => props.noSelect ? 'default' : null,
		userSelect: props => props.noSelect ? 'none' : null
	}
};

const Text =
	withTheme(
		stylesheet(styles)(
			props => {
				// Take out extra props using destructure
				let {
					classes: { text, ...classes }, className,
					color, shade, size, weight, noSelect,
					sheet, theme,
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

Text.displayName = 'Text';

// Prop types copied from MUI Typography prop types
Text.propTypes = {
	align: PropTypes.string, // MUI prop - textAlign
	className: PropTypes.string, // Additional/override styling
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]), // MUI prop
	color: PropTypes.string, // Improvement - can be "primary", "accent", "error", etc. or a css color string
	gutterBottom: PropTypes.bool, // MUI prop - add space at bottom
	headlineMapping: PropTypes.objectOf(PropTypes.string), // MUI prop - maps type to components
	noSelect: PropTypes.bool, // If true, user cannot select text
	noWrap: PropTypes.bool, // MUI prop - text will end with ...
	paragraph: PropTypes.bool, // MUI prop - add space at bottom?
	shade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Defaults to 500, used for selecting the shade of color in a set of color scheme
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // fontSize
	type: PropTypes.oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button']), // MUI prop - text type
	weight: PropTypes.number // fontWeight
};

Text.defaultProps = {
	shade: 500
};

export default Text;