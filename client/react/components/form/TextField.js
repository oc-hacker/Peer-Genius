import React from 'react';
import propTypes from 'prop-types';

import { Field } from 'redux-form';
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

/**
 * Text field class. Allows for entry of text into something.
 */
class TextFieldClass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
    }

    static propTypes = {
        value: propTypes.string.isRequired,
        placeholder: propTypes.string,
        onChange: propTypes.func.isRequired
    }

    render = () => {
        let {
        input, meta: { touched, error, warning },
            label, type, classes, fullWidth, ...fieldProps
        } = this.props;

        return (
            <div style={borderStyle}>
<<<<<<< HEAD
                <input type="text" 
                value={input.value}
                placeholder={placeholder}
                onChange={input.onChange}
                style={textAreaStyle}
                {...fieldProps}
=======
                <input type={type}
	                value={value}
	                placeholder={placeholder}
	                onChange={onChange}
	                style={textAreaStyle}
	                {...fieldProps}
>>>>>>> 3889e03bf048a0b710d3a815f869c412af1c5958
                />
            </div>
        );
    }
}

export default class TextField extends React.Component {
    render = () => {
        return (
            <Field
                component={TextFieldClass}
                {...this.props}
            />
        );
    }
}
