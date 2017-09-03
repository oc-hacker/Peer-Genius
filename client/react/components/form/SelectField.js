import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropdown from 'material-ui-icons/ArrowDropDown';

import Flex from '../Flex';
import FieldControl from './FieldControl';
import StyledLabel from './StyledLabel';
import StyledInput from './StyledInput';
import HelperText from './HelperText';

const styles = ({ palette: { primary, grey, error, warning }, transitions, spacing }) => ({
	input: {
		cursor: 'pointer'
	},
	dropdownIconWrapper: {
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
		pointerEvents: 'none'
	},
	dropdownIcon: {
		color: primary[700]
	}
});

@withStyles(styles)
export class SelectFieldComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string,
		labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.any,
			label: PropTypes.string
		}))
	};
	
	constructor(props) {
		super(props);
		
		this._input = null;
		
		this.state = {
			anchor: null,
			open: false
		};
	}
	
	_onInputClick = event => {
		this.setState({
			anchor: event.currentTarget
		}, this._openMenu);
	};
	
	_openMenu = () => {
		this.setState({
			open: true
		});
	};
	
	_closeMenu = () => {
		this.setState({
			open: false
		});
	};
	
	_makeClickHandler = value => () => {
		this._closeMenu();
		this.props.input.onBlur(value);
	};
	
	render() {
		let {
			input, meta, label, options,
			classes, className, placeholder,
			inputClass, labelClass, labelWidth
		} = this.props;
		let { open, anchor } = this.state;
		
		let selected = '';
		for (let option of options) {
			if (option.value === input.value) {
				selected = option.label;
			}
		}
		
		return (
			<FieldControl
				className={className}
				warning={meta.touched && meta.warning}
				error={meta.touched && meta.error}
			>
				<StyledLabel
					htmlFor={input.name}
					width={labelWidth}
					className={labelClass}
				>
					{label}
				</StyledLabel>
				<StyledInput
					compRef={self => this._input = self}
					className={classNames(classes.input, inputClass)}
					value={selected} readOnly
					placeholder={placeholder || 'Select one...'}
					onClick={this._onInputClick}
				/>
				<Menu
					anchorEl={anchor} style={{ width: anchor ? anchor.clientWidth : 0 }}
					open={open} onRequestClose={this._closeMenu}
				>
					{options.map(option => (
						<MenuItem
							selected={option.value === input.value}
							onClick={this._makeClickHandler(option.value)}
						>
							{option.label}
						</MenuItem>
					))}
				</Menu>
				<Flex align="center" justify="center" className={classes.dropdownIconWrapper}>
					<ArrowDropdown className={classes.dropdownIcon} />
				</Flex>
				<HelperText />
			</FieldControl>
		);
	}
}

const SelectField = props => (
	<Field
		component={SelectFieldComponent}
		{...props}
	/>
);

SelectField.displayName = 'SelectField';

SelectField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string,
	inputClass: PropTypes.string,
	labelClass: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any,
		label: PropTypes.string
	}))
};

export default SelectField;