import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import Flex from '../Flex';
import Route from '../Route';
import ChatScreen from './ChatScreen';
import withProps from '../withProps';

import { post } from '../../../redux/actions/network';
import { selectUserId } from '../../../redux/selectors/user';
import RecentChats from './RecentChats';

export default class Chat extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string
    }),
    selectParticipant: PropTypes.func.isRequired, // Will be called with the ORM session object, should return the id of the other participant.
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { match: { url } } = this.props;

    return (
      <Flex>
        <Route path={url} component={RecentChats} />
        <Route
          path={`${url}/:sessionID`}
          render={withProps({ selectParticipant: this.props.selectParticipant })(ChatScreen)}
        />
      </Flex>
    );
  }
}
