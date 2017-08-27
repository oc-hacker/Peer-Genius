import React from 'react';
import propTypes from 'prop-types';
const borderStyle = {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#D3D3D3",
    borderRadius: "9px"
}

const textAreaStyle = {
    width: "85%",
    wrap: "soft",
    border: "none",
    margin: 0,
    overflow: "auto",
    borderColor: "transparent",
    resize: "none",
    padding: 0,
    marginLeft: "10px",
    outline: "none"
}

/**
 * Text field class. Allows for entry of text into something.
 */
export default class TextField extends React.Component {
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
        return (
            <div style={borderStyle}>
                <input type="text" 
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                style={textAreaStyle}
                />
            </div>
        );
    }
}