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
class TextFieldClass extends React.Component {
	render = () => {
		let {
			input, meta,
			label, type,
			classes, className,
			inputClass, labelClass, labelWidth,
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
					className={labelClass}
				>
					{label}
				</StyledLabel>
				<StyledInput
					type={type}
					className={inputClass}
					{...fieldProps}
				/>
				<HelperText />
			</FieldControl>
		);
	};
}

const TextField = props => (
	<Field
		component={TextFieldClass}
		{...props}
	/>
);

TextField.displayName = 'TextField';

TextField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	inputClass: PropTypes.string,
	labelClass: PropTypes.string,
	labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextField;
