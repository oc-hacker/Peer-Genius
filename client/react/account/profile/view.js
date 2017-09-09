/* eslint-disable */
// TODO Not done yet!
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import { connect } from 'react-redux';

import { Flex, Text } from '../../components';
import { selectUser } from '../../../redux/selectors/user';

@connect(state => ({
  user: selectUser(state)
}))
export default class ViewProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { user } = this.props;

    return (
      <Flex component={Paper} column grow={1} align="center">
        <Text type="title">
          Your Profile
        </Text>
      </Flex>
    );
  }
}