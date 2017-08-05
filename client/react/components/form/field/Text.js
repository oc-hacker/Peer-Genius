import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import stylesheet from 'react-jss';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import CircularProgress from 'material-ui/CircularProgress';

import { getErrors } from './utils';

const styles = {
	fieldContainer: {
		position: 'relative'
	},
	icon: {
		position: 'absolute',
		right: 0
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
		let { asyncValidating } = meta;
		
		let textFieldProps = {
			floatingLabelText: label,
			name,
			value,
			fullWidth: fullWidth !== false,
			...getErrors(meta)
		};
		let hasError = Boolean(textFieldProps.errorText);
		
		let isPassword = type === 'password';
		if (!isPassword || hidden) {
			textFieldProps.type = type;
		}
		
		return (<div className={classes.fieldContainer}>
			<TextField
				{...textFieldProps}
				{...eventProps}
				{...fieldProps}
			/>
			{isPassword && <IconButton
				tooltip={hidden ? 'Unhide' : 'Hide'}
				onClick={this._toggleHide}
				style={{
					...styles.icon,
					bottom: hasError ? 20 : 0
				}}
				tabIndex={-1}
			>
				{hidden ? <Visibility /> : <VisibilityOff />}
			</IconButton>}
			{asyncValidating && <CircularProgress
				size={20}
				thickness={2}
				style={{
					...styles.icon,
					bottom: hasError ? 20 : 0,
					right: 2
				}}
			/>}
		</div>);
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