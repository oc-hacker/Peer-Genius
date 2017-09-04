import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';

import { withStyles } from 'material-ui/styles';

const styles = ({ palette: { primary, grey, error, warning }, typography, spacing }) => ({
	root: {
		position: 'relative',
		flexGrow: 1,
		marginLeft: spacing.unit * 2,
		fontFamily: typography.fontFamily,
		
		borderWidth: 1,
		borderRadius: spacing.unit * 2,
		borderStyle: 'solid',
		borderColor: new Color(primary[500]).alpha(0.6).string(),
		boxSizing: 'border-box',
		padding: spacing.unit,
		
		fontSize: 'inherit',
		'&:focus': {
			outline: 'none'
		}
	},
	error: {
		borderColor: error[500],
		boxShadow: `0 0 ${Math.round(spacing.unit / 2)}px ${error[500]}`
	},
	warning: {
		borderColor: warning[500],
		boxShadow: `0 0 ${Math.round(spacing.unit / 2)}px ${warning[500]}`
	}
});


const StyledInput =
	withStyles(styles)(
		props => {
			let {
				classes, className,
				error, warning,
				Component, compRef,
				...others
			} = props;
			
			return (
				<Component
					ref={compRef}
					className={classNames({
						[classes.root]: true,
						[classes.warning]: warning,
						[classes.error]: error
					}, className)}
					{...others}
				/>
			);
		}
	);

StyledInput.displayName = 'StyledInput';

StyledInput.propTypes = {
	Component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	compRef: PropTypes.func,
};

StyledInput.defaultProps = {
	Component: 'input'
};

export default StyledInput;
