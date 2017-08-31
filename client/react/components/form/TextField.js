import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { withStyles } from 'material-ui/styles';

import FieldControl from './FieldControl';
import StyledLabel from './StyledLabel';
import StyledInput from './StyledInput';
import HelperText from './HelperText';

const styles = ({ palette: {}, spacing }) => ({});

@withStyles(styles)
	/**
	 * Text field class. Allows for entry of text into something.
	 */
class TextFieldClass extends React.Component {
	constructor(props) {
		super(props);
	}
	
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		placeholder: PropTypes.string,
		labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
	
	render = () => {
		let {
			input, meta,
			label, type,
			classes, className, labelWidth,
			...fieldProps
		} = this.props;
		
		return (
			<FieldControl
				className={className}
				error={meta.touched && meta.error}
				warning={meta.touched && meta.warning}
			>
				<StyledLabel
					htmlFor={input.name}
					width={labelWidth}
				>
					{label}
				</StyledLabel>
				<StyledInput
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
