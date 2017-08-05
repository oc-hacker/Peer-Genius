import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';

import { getErrors } from './utils';

/**
 * A <code>CheckText</code> is a combination of checkbox and text.
 * @param props
 */
class CheckTextComponent extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			checked: Boolean(props.startChecked)
		};
	}
	
	check = () => {
		let { input: { value, onChange }, uncheckedValue } = this.props;
		this.setState({
			checked: true
		});
		if (value === uncheckedValue) {
			onChange('');
		}
	};
	
	uncheck = () => {
		let { input: { value, onChange }, clearOnUncheck, uncheckedValue } = this.props;
		this.setState({
			checked: false
		});
		if (clearOnUncheck) {
			onChange(uncheckedValue);
		}
	};
	
	render() {
		let {
			input: { name, value, ...eventProps },
			meta,
			uncheckedValue,
			label,
			checkLabel,
			textLabel,
			style,
			checkStyle,
			textStyle,
			startChecked,
			clearOnUncheck,
			...fieldProps
		} = this.props;
		let { checked } = this.state;
		
		if (uncheckedValue) {
			console.warn('Having a truthy value as uncheckedValue may cause unexpected behaviours. Generally, you should use null.');
		}
		
		// Use label as fallback
		checkLabel = checkLabel || label;
		textLabel = textLabel || label;
		
		let textFieldProps = {
			hintText: textLabel,
			name,
			value: checked ? value : '',
			disabled: !checked,
			...getErrors(meta)
		};
		
		return (
			<div style={{ display: 'flex', alignItems: 'center', width: '100%', ...style }}>
				<Checkbox
					label={checkLabel}
					checked={checked}
					onCheck={() => checked ? this.uncheck() : this.check()}
					style={{
						width: 'auto', flex: '0 0 auto', marginRight: '1em',
						...checkStyle
					}}
					labelStyle={{ whiteSpace: 'nowrap' }}
				/>
				<TextField
					{...textFieldProps}
					{...eventProps}
					{...fieldProps}
					style={{ flex: '1 1 auto', ...textStyle }}
				/>
			</div>
		);
	}
}

/**
 * All props passed will be given to <code>Field</code> from <code>redux-forms</code>. Any props not used by <code>Field</code> will be passed to <code>TextField</code> from <code>material-ui</code>.
 */
const CheckText = props => {
	return (<Field
		component={CheckTextComponent}
		{...props}
	/>);
};

CheckText.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	checkLabel: PropTypes.string,
	textLabel: PropTypes.string,
	checkStyle: PropTypes.object,
	textStyle: PropTypes.object,
	uncheckedValue: PropTypes.any,
	clearOnUncheck: PropTypes.bool,
	startChecked: PropTypes.bool
};

CheckText.defaultProps = {
	uncheckedValue: null,
	clearOnUncheck: true
};

export default CheckText;