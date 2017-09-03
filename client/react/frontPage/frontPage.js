import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';

import throttle from 'lodash/throttle';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { GuestAppBar } from '../components';
import PageZero from './PageComponents/page0';
import PageOne from './PageComponents/page1';
import PageTwo from './PageComponents/page2';
import PageThree from './PageComponents/page3';
import PageRadio from './pageRadio';
import PageFour from './PageComponents/page4';
import LoginDialog from './login';
import CreateAccountDialog from './CreateAccountComponents';

const styles = {
	frontPage: {
		position: 'relative',
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	}
};

/**
 * Clamps the input number between <code>min</code> and <code>max</code>, inclusive.
 * If <code>min > max</code>, <code>min</code> has authority over <code>max</code>.
 *
 * @param {number} input
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const clamp = (input, min, max) => {
	if (input > max) {
		input = max;
	}
	if (input < min) {
		input = min;
	}
	return input;
};

@connect(null, { push })
@withStyles(styles)
export default class FrontPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: 0,
			logInOpen: false,
			createAccountOpen: false
		};
	}
	
	_openLogIn = () => {
		this.setState({
			logInOpen: true
		});
	};
	
	_closeLogIn = () => {
		this.setState({
			logInOpen: false
		});
	};
	
	_openCreateAccount = () => {
		this.setState({
			createAccountOpen: true
		});
	};
	
	_closeCreateAccount = () => {
		this.setState({
			createAccountOpen: false
		});
	};
	
	_nextPage = () => {
		this.setState(state => ({
			page: Math.min(state.page + 1, 4)
		}));
	};
	
	_previousPage = () => {
		this.setState(state => ({
			page: Math.max(state.page - 1, 0)
		}));
	};
	
	_setPage = page => {
		this.setState({
			page: clamp(page, 0, 4)
		});
	};
	
	_onScroll = throttle(event => {
		if (event.deltaY < 0) {
			// Scroll up
			this._previousPage();
		}
		else {
			// Scroll down
			this._nextPage();
		}
	}, 1000, { trailing: false });
	
	render() {
		let { classes } = this.props;
		let { page: currentPage, logInOpen, createAccountOpen } = this.state;
		
		return (
			<div
				className={classes.frontPage}
				onWheel={this._onScroll}
			>
                <GuestAppBar currentPage={currentPage} />
				<PageZero
					currentPage={currentPage}
					openLogIn={this._openLogIn} createAccount={this._openCreateAccount}
				/>
				<PageOne
					currentPage={currentPage}
					next={this._nextPage}
				/>
				<PageTwo currentPage={currentPage} />
				<PageThree currentPage={currentPage} />
				<PageFour
					currentPage={currentPage}
					createAccount={this._openCreateAccount}
				/>
				<PageRadio
					currentPage={currentPage}
					setPage={this._setPage}
				/>
				<LoginDialog open={logInOpen} onRequestClose={this._closeLogIn} />
				<CreateAccountDialog open={createAccountOpen} onRequestClose={this._closeCreateAccount} />
			</div>
		);
	}
}