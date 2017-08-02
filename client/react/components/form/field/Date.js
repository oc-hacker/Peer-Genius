import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import stylesheet from 'react-jss';

import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500 } from 'material-ui/styles/colors';
import { getErrors } from './utils';

const styles = {
	date: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
};

const DateComponent = stylesheet(styles)(props => {
	let {
		input: { name, value, onChange },
		meta,
		classes,
		minAge,
		maxAge,
		label,
		fullWidth,
		disableToday,
		...fieldProps
	} = props;
	
	let date = value ? new Date(value) : null;
	
	let pickerProps = {
		floatingLabelText: label,
		name,
		value: date,
		fullWidth: fullWidth !== false,
		...getErrors(meta)
	};
	
	// Construct date range
	let year = new Date().getFullYear();
	if (maxAge || maxAge === 0) {
		pickerProps.minDate = new Date(new Date().setFullYear(year - maxAge));
	}
	if (minAge || minAge === 0) {
		pickerProps.maxDate = new Date(new Date().setFullYear(year - minAge));
	}
	
	return (
		<div className={classes.date}>
			<DatePicker
				{...pickerProps}
				openToYearSelection
				style={{ flexGrow: 1 }}
				textFieldStyle={{ cursor: 'pointer' }}
				onChange={(event, date) => onChange(date.toISOString())}
				{...fieldProps}
			/>
			{!disableToday && (
				<RaisedButton
					primary
					style={{ position: 'absolute', right: 0, bottom: 0 }}
					onTouchTap={() => onChange(new Date().toISOString())}
				>
					Today
				</RaisedButton>
			)}
		</div>
	);
});

/**
 * All props passed will be given to <code>Field</code> from <code>redux-forms</code>. Any props not used by <code>Field</code> will be passed to <code>DatePicker</code> from <code>material-ui</code>.
 */
const DateField = props => (<Field
	component={DateComponent}
	{...props}
/>);

DateField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	disableToday: PropTypes.bool,
	minAge: PropTypes.number,
	maxAge: PropTypes.number
};

export default DateField;