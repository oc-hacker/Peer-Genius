import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Hide from 'material-ui-icons/VisibilityOff';
import Unhide from 'material-ui-icons/Visibility';

import { connect } from 'react-redux';

const styles = {
	fieldContainer: {
		position: 'relative'
	},
	icon: {
		position: 'absolute',
		right: 0,
		top: 8
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
export class TextFieldComponent extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			hidden: true
		};
	}
	
	_toggleHide = () => {
		this.setState(state => ({
			hidden: !state.hidden
		}));
	};
	
	render() {
		let {
			input, meta: { touched, error, warning },
			label, type, classes, fullWidth, ...fieldProps
		} = this.props;
		let { hidden } = this.state;
		
		let warningClass = classNames({
			[classes.warning]: touched && (warning && !error)
		});
		
		let inputType = type;
		if (type === 'password' && !hidden) {
			inputType = 'text';
		}
		
		return (
			<FormControl
				className={classes.fieldContainer}
				fullWidth={fullWidth !== false}
				error={Boolean(touched && (error || warning))}
			>
				<InputLabel className={warningClass}>
					{label}
				</InputLabel>
				<Input
					{...input}
					type={inputType}
					classes={{
						error: classNames({
							[classes.warningInput]: touched && (warning && !error)
						})
					}}
				/>
				<FormHelperText classes={{ error: warningClass }}>
					{touched && (error || warning)}
				</FormHelperText>
				{type === 'password' && (
					<IconButton
						className={classes.icon} tabIndex="-1"
						onClick={this._toggleHide}
					>
						{hidden ? <Unhide /> : <Hide />}
					</IconButton>
				)}
			</FormControl>
		);
	}
}

export default class TextField extends Component {
	static propTypes = {
		name: PropTypes.string,
		label: PropTypes.string
	};
	
	render() {
		return (
			<Field
				component={TextFieldComponent}
				{...this.props}
			/>
		);
	}
}