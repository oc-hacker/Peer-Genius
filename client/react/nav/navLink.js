import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(null, {
	push
})
export default class NavLink extends PureComponent {
	static propTypes = {
		label: PropTypes.string.isRequired,
		desc: PropTypes.string,
		link: PropTypes.string.isRequired
	};
	
	constructor(props) {
		super(props);
	}
	
	render() {
		let { label, desc, link, push, onTouchTap, ...others } = this.props;
		
		return (
			<ListItem
				primaryText={label}
				secondaryText={desc}
				onTouchTap={event => {
					onTouchTap(event);
					push(link);
				}}
				{...others}
			/>
		);
	}
}