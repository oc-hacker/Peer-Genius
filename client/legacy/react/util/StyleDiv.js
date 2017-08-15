import React from 'react';

/**
 * @classdesc A div class that passes the properties of a Form to its children
 */
export default class StyleDiv extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render = () => {
		return (
			<div style={this.props.style}>
				{
					React.Children.map(this.props.children, child => React.cloneElement(child, {
						onEnterPress: this.props.onEnterPress,
						markRequired: this.props.markRequired,
						width: this.props.width,
						formName: this.props.formName
					}))
				}
			</div>
		)
	}
}