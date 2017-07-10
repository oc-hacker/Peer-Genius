import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MuiDialog from 'material-ui/Dialog';

import { zIndex } from '../reference/zIndex.js';

const style = {
	dialog: {
		zIndex: zIndex.success
	},
	center: {
		textAlign: 'center'
	}
};

/**
 * @classdesc A dialogue that pops up with messages for different actions on completion
 */
@connect(state => ({
	successText: state.success.text,
	showSuccess: state.success.show
}))
export default class Success extends React.Component {
	constructor(props) {
		super(props);
	}
	
	static propTypes = {
		successText: PropTypes.string.isRequired,	// The text to be displayed in the dialog
		showSuccess: PropTypes.bool.isRequired		// Whether the dialog should be visible
	};

	render = () => {
		return (
			<MuiDialog
				title={this.props.successText}
				open={this.props.showSuccess}
				style={style.dialog}
				bodyStyle={style.center}
				titleStyle={style.center}
			/>
		);
	}
};