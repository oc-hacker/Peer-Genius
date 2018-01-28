import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Flex, Text } from '../../components/index';
import DataRow from './DataRow';
import { post } from '../../../redux/actions/network';
import { selectCourses } from '../../../redux/selectors/config';

const styles = ({ spacing }) => ({
  root: {
    padding: `${spacing.unit * 4}px 0`
  }
});

@withStyles(styles)
@connect(store => ({
  courses: selectCourses(store)
}))
export default class PreviousSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLastSession: true,
      guru: 'Loading',
      assignment: 'Loading',
      course: 'Loading',
      date: 'Loading',
      length: 'Loading',
      error: false
    };
  }

  _loadLastSession = async () => {
    let sessionData = await post('/api/session/recent', {
      mode: 'newbie',
      limit: 1
    }).then(response => response.json());

    let lastSession = sessionData.recentSessions[0];

    if (lastSession) {
      // Load detailed information about last session
      let sessionInfo = await post('/api/session/info', {
        sessionId: lastSession.id
      })
        .then(response => response.json())
        .then(data => data.session);

      // Parse data
      let course = this.props.courses.find(course => course.id === sessionInfo.course.id);
      let hour = 3600000;
      let length = (
        new Date(sessionInfo.endTime || sessionInfo.scheduledEnd).getTime()
        - new Date(sessionInfo.startTime || sessionInfo.scheduledStart).getTime()
      ) / hour;

      // Save to state
      this.setState({
        guru: sessionInfo.guru.firstName + ' ' + sessionInfo.guru.lastName,
        course: course && course.name,
        assignment: sessionInfo.assignment,
        date: new Date(sessionInfo.startTime || sessionInfo.scheduledStart).toDateString(),
        length: `${length.toFixed(2)} Hours`,
      });
    }
    else {
      this.setState({
        hasLastSession: false
      });
    }
  };

  componentWillMount() {
    this._loadLastSession()
      .catch(error => this.setState({ error }));
  }

  render() {
    let { classes } = this.props;
    let { error, hasLastSession, guru, course, assignment, date, length } = this.state;

    if (!hasLastSession) {
      return (
        <Flex
          column align='center'
          className={classes.root}
        >
          <Text>
            It appears that you have not had a session yet!
          </Text>
          <Text>
            Schedule a session using the "REQUEST FOR ANOTHER SESSION" button above.
          </Text>
        </Flex>
      );
    }

    return (
      <Flex
        column grow={1}
        className={classes.root}
      >
        <Text type='title' align='center'>
          PREVIOUS SESSION
        </Text>
        <Flex grow={1}>
          <Flex grow={2} justify='center'>
            <tbody>
            <DataRow name='GURU' value={guru} />
            <DataRow name='Course' value={course} />
            <DataRow name='Assignment' value={assignment} />
            <DataRow name='Date' value={date} />
            <DataRow name='Length' value={length} />
            </tbody>
          </Flex>
          <Flex grow={1}>
            TODO profile picture
          </Flex>
        </Flex>
      </Flex>
    );
  }
}