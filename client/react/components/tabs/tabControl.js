import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

export default RawComponent => {
	return class TabControlComponent extends Component {
		static isTabControl = true;
		
		render() {
			return (<RawComponent {...this.props} />);
		}
	};
}
