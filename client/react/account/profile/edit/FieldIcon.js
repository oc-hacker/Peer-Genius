import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';
import classNames from 'classnames';

import { withTheme } from 'material-ui/styles';

const styles = {
	outer: {
		position: 'relative',
		width: props => props.size,
		height: props => props.size,
		
		borderRadius: '50%',
		backgroundColor: props => props.theme.palette.primary[500]
	},
	inner: {
		position: 'absolute',
		left: '30%',
		right: '30%',
		top: '30%',
		bottom: '30%',
		
		borderRadius: '50%',
		backgroundColor: 'white'
	}
};

const FieldIcon =
	withTheme(
		stylesheet(styles)(
			props => {
				let { classes, className } = props;
				
				return (
					<div className={classNames(classes.outer, className)}>
						<div className={classes.inner} />
					</div>
				);
			}
		)
	);

FieldIcon.displayName = 'FieldIcon';

FieldIcon.propTypes = {
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

FieldIcon.defaultProps = {
	size: 24
};

export default FieldIcon;
