import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CircularProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Flex from '../Flex';
import Text from '../Text';
import { waitForInit } from '../HOC';

import { post } from '../../../redux/actions/network';
import { selectUserId } from '../../../redux/selectors/user';
import { socketEmit } from '../../../redux/actions/creators/socket';

@waitForInit
@connect(state => ({
  userId: selectUserId(state)
}), { push, socketEmit })
export default class RecentChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      recent: []
    };
  }

  _loadRecent = async () => {
    let { userId } = this.props;

    this.setState({
      loading: true
    });

    let response = await post('/api/session/recent');
    let { recentSessions } = await response.json();

    this.setState({
      loading: false,
      recent: recentSessions
        .map(session => {
          if (session.guru.id === userId) {
            return {
              id: session.id,
              participantName: session.newbie.name,
              course: session.course.name
            };
          }
          if (session.newbie.id === userId) {
            return {
              id: session.id,
              participantName: session.guru.name,
              course: session.course.name
            };
          }
          return null;
        })
    });
  };

  _changeChat = (mode, session) => {
    console.log("Sleeping...")
    this.props.socketEmit('updateVolunteerTime', {
      action: 'stop'
    });
    this.props.push(`/${mode}/sessions/${session.id}`);
    setTimeout(() => { 
      console.log("Waking up...")
      this.props.socketEmit('updateVolunteerTime', {
        action: 'wakeup'
      });
    }, 250);
  };

  componentWillMount() {
    this._loadRecent()
      .catch(error => {
        console.error(error);
        this.setState({
          error: true
        });
      });
  }

  render() {
    let { push, mode, match: { params } } = this.props;
    let { loading, error, recent } = this.state;

    if (error) {
      return (
        <Text color='error'>
          Error: failed to fetch recent sessions.
        </Text>
      );
    }

    if (loading) {
      return (
        <Flex
          grow={1}
          column
          align='center'
          justify='flex-start'
        >
          <CircularProgress />
        </Flex>
      );
    }

    recent.sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });

    return (
      <Flex
        column
        align='stretch'
        grow={1}
        style={{ padding: '1em' }}
      >
        <Text type='title'>
          Recent Sessions
        </Text>
        <List>
          {recent.length ? null : (
            <ListItem>
              <ListItemText
                primary={'No recent chats found.'}
              />
            </ListItem>
          )}
          {recent.map(session => {
            let selected = params.sessionId === session.id;

            return (
              <ListItem
                key={session.id}
                button
                onClick={() => this._changeChat(mode, session)}
                style={{ backgroundColor: selected ? 'lightgrey' : null }}
              >
                <ListItemText
                  primary={session.participantName}
                  secondary={`Subject: ${session.course}`}
                />
              </ListItem>
            );
          })}
        </List>
      </Flex>
    );
  }
}