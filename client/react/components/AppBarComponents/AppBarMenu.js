import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Menu from 'material-ui/Menu';

const styles = {
	root: {
		width: '10em',
		height: '100%'
	},
	buttonWrapper: {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer'
	}
};

@withStyles(styles)
export default class AppBarMenu extends Component {
	static propTypes = {
		button: PropTypes.node.isRequired,
		onClick: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		
		this._root = null;
		
		this.state = {
			open: false,
			anchor: null,
			rootWidth: 0,
			rootHeight: 0
		};
	}
	
	_onClick = () => {
		this.setState({
			open: true,
			anchor: this._root,
			rootWidth: this._root.clientWidth,
			rootHeight: this._root.clientHeight
		});
	};
	
	_closeMenu = () => {
		this.setState({
			open: false
		});
	};
	
	render() {
		let { classes, button, onClick, children } = this.props;
		let { open, anchor, rootWidth, rootHeight } = this.state;
		
		return (
			<div ref={self => this._root = self} className={classes.root}>
				<div className={classes.buttonWrapper} onClick={onClick || this._onClick}>
					{button}
				</div>
				<Menu
					anchorEl={anchor} style={{ width: rootWidth, marginTop: rootHeight }}
					open={open} onRequestClose={this._closeMenu}
				>
					{children}
				</Menu>
			</div>
		);
	}
}