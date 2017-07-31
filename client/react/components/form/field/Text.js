import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import stylesheet from 'react-jss';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { orange500 } from 'material-ui/styles/colors';

import { getErrors } from './utils';

const styles = {
	fieldContainer: {
		position: 'relative'
	},
	iconButton: {
		position: 'absolute',
		right: 0,
		bottom: 0
	}
};

@stylesheet(styles)
class TextInputField extends PureComponent {
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
			input: { name, value, ...eventProps },
			meta,
			label,
			type,
			classes,
			fullWidth,
			...fieldProps
		} = this.props;
		let { hidden } = this.state;
		
		let textFieldProps = {
			floatingLabelText: label,
			name,
			value,
			fullWidth: fullWidth !== false,
			...getErrors(meta)
		};
		
		if (type === 'password') {
			if (hidden) {
				textFieldProps.type = type;
			}
			
			return (<div className={classes.fieldContainer}>
				<TextField
					{...textFieldProps}
					{...eventProps}
					{...fieldProps}
				/>
				<IconButton
					tooltip={hidden ? 'Unhide' : 'Hide'}
					onClick={this._toggleHide}
					style={styles.iconButton}
					tabIndex={-1}
				>
					{hidden ? <Visibility /> : <VisibilityOff />}
				</IconButton>
			</div>);
		}
		else {
			textFieldProps.type = type;
			return (
				<TextField
					{...textFieldProps}
					{...eventProps}
					{...fieldProps}
				/>
			);
		}
	}
}

const Text = props => (<Field
	component={TextInputField}
	{...props}
/>);

Text.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string
};

export default Text;