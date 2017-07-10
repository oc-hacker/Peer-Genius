import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MuiDialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

import { zIndex } from '../reference/zIndex.js';

const style = {
	dialog: {
		zIndex: zIndex.loading
	},
	center: {
		textAlign: 'center'
	}
};

/**
 * @classdesc The loading dialog that pops up when fetching to the server
 */
@connect(state => ({
	fetching: state.fetching
}))
export default class Loading extends React.Component {
	constructor(props) {
		super(props);
	}
	
	static propTypes = {
		fetching: PropTypes.bool.isRequired		// Whether the client is currently fetching to the server
	};

	render = () => {
		return (
			<MuiDialog
				title="Loading..."
				open={this.props.fetching}
				style={style.dialog}
				bodyStyle={style.center}
				titleStyle={style.center}
			>
				<CircularProgress />
			</MuiDialog>
		);
	}
};