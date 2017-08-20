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
		open: PropTypes.bool,
		onRequestClose: PropTypes.func.isRequired,
		button: PropTypes.node.isRequired,
		onClick: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		
		this._root = null;
		
		this.state = {
			anchor: null,
			rootWidth: 0,
			rootHeight: 0
		};
	}
	
	_onClick = event => {
		this.props.onClick(event);
		this.setState({
			anchor: this._root,
			rootWidth: this._root.clientWidth,
			rootHeight: this._root.clientHeight
		});
	};
	
	render() {
		let {
			classes,
			button, open, onRequestClose,
			children
		} = this.props;
		let { anchor, rootWidth, rootHeight } = this.state;
		
		return (
			<div ref={self => this._root = self} className={classes.root}>
				<div className={classes.buttonWrapper} onClick={this._onClick}>
					{button}
				</div>
				<Menu
					anchorEl={anchor} style={{ width: rootWidth, marginTop: rootHeight }}
					open={open} onRequestClose={onRequestClose}
				>
					{children}
				</Menu>
			</div>
		);
	}
}