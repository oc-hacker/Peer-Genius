import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import Flex from '../Flex';
import Route from '../Route';
import ChatScreenManager from './ChatScreenManager';
import withProps from '../HOC/withProps';

import { post } from '../../../redux/actions/network';
import { selectUserId } from '../../../redux/selectors/user';
import RecentChats from './RecentChats';

export default class Chat extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string
    }),
    mode: PropTypes.oneOf(['newbie', 'guru'])
  };

  render() {
    let { match: { url } } = this.props;

    return (
      <Flex grow={1}>
        <Route path={url} render={withProps({ mode: this.props.mode })(RecentChats)} />
        <Route
          path={`${url}/:sessionId`}
          render={props => (
            <ChatScreenManager
              mode={this.props.mode}
              {...props}
            />
          )}
        />
      </Flex>
    );
  }
}
