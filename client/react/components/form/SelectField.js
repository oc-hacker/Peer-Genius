import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropdown from 'material-ui-icons/ArrowDropDown';

import { connect } from 'react-redux';

import ClickInput from './ClickInput';
import DisabledInput from './DisabledInput';

/**
 * Reverses the keys and values of an object.
 * Warning: having duplicate keys will have unexpected behaviour.
 */
const reverse = map => {
	let reverseMap = {};
	
	for (let prop in map) {
		if (map.hasOwnProperty(prop)) {
			if (map[prop] in reverseMap) {
				console.warn('Reverse mapping an object with duplicate values will have unexpected behaviour.');
			}
			reverseMap[map[prop]] = prop;
		}
	}
	
	return reverseMap;
};

const styles = {
	fieldContainer: {
		position: 'relative'
	},
	icon: {
		position: 'absolute',
		right: 0,
		top: '1.4em'
	},
	input: {
		cursor: 'pointer'
	},
	warning: {
		color: orange[500]
	},
	warningInput: {
		'&:after': {
			backgroundColor: orange[500]
		}
	}
};

@withStyles(styles)
export class SelectFieldComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		options: PropTypes.object
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			anchor: null,
			open: false
		};
	}
	
	_onInputFocus = event => {
		const { input: { value, onFocus } } = this.props;
		
		onFocus(value);
	};
	
	_onInputBlur = event => {
		const { input: { value, onBlur } } = this.props;
		
		onBlur(value);
	};
	
	_onInputClick = event => {
		this.setState({
			anchor: event.currentTarget,
			open: true
		});
	};
	
	_closeMenu = () => {
		this.setState({
			open: false
		});
		this._onInputBlur(); // Artificially blur the field to mark it as touched
	};
	
	_makeSelectHandler = value => () => {
		this._closeMenu();
		this.props.input.onChange(value);
	};
	
	render() {
		let {
			input: { onChange, onFocus, onBlur, ...input }, meta: { touched, error, warning },
			label, options, classes, fullWidth, ...fieldProps
		} = this.props;
		let { anchor, open } = this.state;
		
		let warningClass = classNames({
			[classes.warning]: touched && (warning && !error)
		});
		
		return (
			<FormControl
				className={classes.fieldContainer}
				fullWidth={fullWidth !== false}
				error={touched && (error || warning)}
			>
				<ArrowDropdown className={classes.icon} />
				<InputLabel className={warningClass} shrink={Boolean(input.value)}>
					{label}
				</InputLabel>
				<Input
					{...input}
					component={DisabledInput}
					onFocus={this._onInputFocus}
					onBlur={this._onInputBlur}
					onClick={this._onInputClick}
					classes={{
						input: classes.input,
						error: classNames({
							[classes.warningInput]: touched && (warning && !error)
						})
					}}
				/>
				<FormHelperText classes={{ error: warningClass }}>
					{touched && (error || warning)}
				</FormHelperText>
				<Menu
					anchorEl={anchor}
					open={open} onRequestClose={this._closeMenu}
					style={{ width: anchor ? anchor.clientWidth : 0 }}
				>
					{Object.values(options).map(value => (
						<MenuItem key={value} onClick={this._makeSelectHandler(value)}>
							{value}
						</MenuItem>
					))}
				</Menu>
			</FormControl>
		);
	}
}

export default class SelectField extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		options: PropTypes.object
	};
	
	constructor(props) {
		super(props);
		this._reverseMap = null;
	}
	
	_format = value => this.props.options[value];
	
	_parse = input => this._reverseMap[input];
	
	componentWillMount() {
		this._reverseMap = reverse(this.props.options);
	}
	
	render() {
		return (
			<Field
				component={SelectFieldComponent}
				format={this._format}
				parse={this._parse}
				{...this.props}
			/>
		);
	}
}