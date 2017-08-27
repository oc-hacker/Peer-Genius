import React from 'react';
import propTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const borderStyle = {
	borderStyle: 'solid',
	borderWidth: '1px',
	borderColor: '#D3D3D3',
	borderRadius: '9px'
};

const textAreaStyle = {
	width: '85%',
	wrap: 'soft',
	border: 'none',
	margin: 0,
	overflow: 'auto',
	borderColor: 'transparent',
	resize: 'none',
	padding: 0,
	marginLeft: '10px',
	outline: 'none'
};

const styles = {

}

export default class TextField extends React.Component {
	static propTypes = {
		value: propTypes.string.isRequired,
		placeholder: propTypes.string,
		onChange: propTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	render = () => {
		let { type, value, placeholder, onChange, ...fieldProps } = this.props;
		return (
			<div style={borderStyle}>
				<input type={type}
				       value={value}
				       placeholder={placeholder}
				       onChange={onChange}
				       style={textAreaStyle}
					   {...fieldProps}
				/>
			</div>
		);
	};
}
