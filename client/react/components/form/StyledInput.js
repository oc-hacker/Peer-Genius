import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';

const styles = ({ palette: { grey, error }, spacing }) => ({
	root: {
		position: 'relative',
		flexGrow: 1,
		marginLeft: spacing.unit * 2,
		
		borderWidth: 1,
		borderRadius: spacing.unit / 2,
		borderStyle: 'solid',
		borderColor: grey[300],
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
		borderColor: orange[500],
		boxShadow: `0 0 ${Math.round(spacing.unit / 2)}px ${orange[500]}`
	}
});


const StyledInput =
	withStyles(styles)(
		props => {
			let {
				classes, className,
				error, warning,
				component: Component, compRef,
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
	component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	compRef: PropTypes.func,
};

StyledInput.defaultProps = {
	component: 'input'
};

export default StyledInput;
