import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import throttle from 'lodash/throttle';
import { connect } from 'react-redux';

import Page from './Page';

const styles = {
	frontPage: {
		position: 'relative',
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	}
};

export default class FrontPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: 0
		};
	}
	
	_onScroll = throttle(event => {
		let { page } = this.state;
		if (event.deltaY < 0) {
			// Scroll up
			this.setState(state => ({
				page: Math.max(state.page - 1, 0)
			}));
		}
		else {
			// Scroll down
		}
	}, 1000, { trailing: false });
	
	render() {
		let { page: currentPage } = this.state;
		
		return (
			<div>
				<Page page={0} currentPage={currentPage}>
				
				</Page>
				<Page page={1} currentPage={currentPage}>
				
				</Page>
			</div>
		);
	}
}