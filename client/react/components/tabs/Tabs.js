import React, { Component, PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	reverse: {
		flexDirection: 'column-reverse'
	},
	container: {
		position: 'relative',
		overflow: 'hidden'
	}
};

@withStyles(styles)
export default class Tabs extends Component {
	static propTypes = {
		controlPosition: PropTypes.oneOf(['top', 'bottom'])
	};
	
	static defaultProps = {
		controlPosition: 'top'
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			currentTab: 0,
			tabTitles: []
		};
	}
	
	_setTab = tab => {
		let { tabTitles } = this.state;
		
		if (typeof tab === 'string') {
			// Set by tab title
			tab = tabTitles.indexOf(tab);
		}
		
		// Cancel if tab out of bounds
		if (tab < 0 || tab >= tabTitles.length) {
			console.warn('Trying to switch to a nonexistent tab. Operation aborted.');
		}
		else {
			this.setState({
				currentTab: tab
			});
		}
	};
	
	_registerTab = title => {
		this.setState(state => ({
			tabTitles: state.tabTitles.concat(title)
		}));
	};
	
	_unregisterTab = tabIndex => {
		this.setState(state => ({
			tabTitles: state.tabTitles.filter((_, index) => index !== tabIndex)
		}));
	};
	
	render() {
		let { className, classes, children, controlPosition, ...others } = this.props;
		let { currentTab, tabTitles } = this.state;
		
		let index = 0;
		return (
			<div
				className={classNames(
					classes.root,
					{
						[classes.reverse]: controlPosition === 'bottom'
					},
					className
				)}
				{...others}
			>
				{Children.map(children, child => {
					if (child.type.isTabControl) {
						return React.cloneElement(child, {
							currentTab,
							tabTitles,
							setTab: this._setTab
						});
					}
					else if (child.type.isTab) {
						return null;
					}
					else {
						throw new Error('Only components decorated with @tab or @tabControl should be placed inside Tabs!');
					}
				})}
				<div className={classes.container}>
					{Children.map(children, child => {
						if (child.type.isTab) {
							child = React.cloneElement(child, {
								tabIndex: index,
								currentTab,
								setTab: this._setTab,
								registerTab: this._registerTab,
								unregisterTab: this._unregisterTab
							});
							index++;
							return child;
						}
					})}
				</div>
			</div>
		);
	}
}