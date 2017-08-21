import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

const styles = {
	tab: {
		position: props => props.tabIndex ? 'absolute' : 'static',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		transform: props => `translateX(${(props.tabIndex - props.currentTab) * 100}%)`,
		transition: 'transform 0.5s ease'
	}
};

export default (title = '') => RawComponent => {
	@stylesheet(styles)
	class StyledTabComponent extends Component {
		render() {
			let { classes, className, ...others } = this.props;
			
			return (<RawComponent className={classNames(classes.tab, className)} {...others} />);
		}
	}
	
	return class TabComponent extends Component {
		static isTab = true;
		
		constructor(props) {
			super(props);
		}
		
		componentDidMount() {
			let { title: tabTitle, registerTab } = this.props;
			
			registerTab(tabTitle || title);
		}
		
		componentWillUnmount() {
			let { tabIndex, unregisterTab } = this.props;
			
			unregisterTab(tabIndex);
		}
		
		render() {
			let { registerTab, unregisterTab, ...others } = this.props;
			
			return (
				<StyledTabComponent {...others} />
			);
		}
	};
}
