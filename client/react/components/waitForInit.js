import React, { Component } from 'react';

import { CircularProgress } from 'material-ui/Progress';

import { connect } from 'react-redux';

import Flex from './Flex';

import { status } from '../../redux/actions/request';
import { selectInitStatus } from '../../redux/selectors/status';

/**
 * A decorator that makes a component wait for initialization to complete before rendering its contents.
 */
export default RawComponent => {
	@connect(state => ({
		initStatus: selectInitStatus(state)
	}))
	class InitializedComponent extends Component {
		render() {
			let { initStatus, ...others } = this.props;
			
			if (initStatus !== status.COMPLETE) {
				return (
					<Flex align="center" justify="center">
						<CircularProgress />
					</Flex>
				);
			}
			else {
				return (
					<RawComponent {...others} />
				);
			}
		}
	}
	
	return InitializedComponent;
}
