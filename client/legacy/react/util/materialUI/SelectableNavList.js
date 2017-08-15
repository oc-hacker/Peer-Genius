import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { List, makeSelectable } from 'material-ui/List';

let MuiSelectableList = makeSelectable(List);

/**
 * @classdesc Selectable Material UI List of navigation links.
 */
@connect(state => ({
	url: state.routing.locationBeforeTransitions.pathname
}), {
	push
})
export default class SelectableNavList extends React.Component {
	constructor(props) {
		super(props);
	}
	
	_onChange = (event, index) => {
		if (typeof index === 'string' && index.indexOf('/') !== -1) {
			// Push the route to the index value of the selected link
			this.props.push(index);
		}
	}

	render = () => {
		return (
			<MuiSelectableList value={this.props.url} onChange={this._onChange}>
				{this.props.children}
			</MuiSelectableList>
		);
	}
};