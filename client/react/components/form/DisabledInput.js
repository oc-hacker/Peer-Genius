import React, { Component } from 'react';

export default class DisabledInput extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (<input {...this.props} disabled />);
	}
}