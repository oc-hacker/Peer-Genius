import React from 'react';
import propTypes from 'prop-types';
import { Field } from 'redux-form';

import { withStyles } from 'material-ui/styles';

import FieldControl from './FieldControl';
import HelperText from './HelperText';

const styles = ({ palette: {}, spacing }) => ({
	input: {
		width: '100%',
		padding: spacing.unit,
		boxSizing: 'border-box',
		
		border: 'none',
		backgroundColor: 'transparent',
		fontSize: 'inherit',
		
		'&:focus': {
			outline: 'none'
		}
	},
});

@withStyles(styles)
	/**
	 * Text field class. Allows for entry of text into something.
	 */
class TextFieldClass extends React.Component {
	constructor(props) {
		super(props);
	}
	
	static propTypes = {
		value: propTypes.string.isRequired,
		placeholder: propTypes.string,
		onChange: propTypes.func.isRequired,
		type: propTypes.func.isRequired
	};
	
	render = () => {
		let {
			input, meta,
			label, type, classes, className, ...fieldProps
		} = this.props;
		
		return (
			<FieldControl
				className={className}
				error={meta.touched && meta.error}
				warning={meta.touched && meta.warning}
			>
				<input
					className={classes.input}
					type={type}
					{...fieldProps}
				/>
				<HelperText />
			</FieldControl>
		);
	};
}

export default class TextField extends React.Component {
	render = () => {
		return (
			<Field
				component={TextFieldClass}
				{...this.props}
			/>
		);
	};
}
