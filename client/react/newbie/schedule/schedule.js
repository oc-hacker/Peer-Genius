import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { scheduleSession } from '../../../redux/actions/creators/PGsession';

import { Button, Flex, Spacer, Text } from '../../components';
import TextField from 'material-ui/TextField';

import { serverURL } from '../../../config';

const styles = {
  title: {
    // backgroundImage: 'url(assets/)'
    backgroundColor: '#3bb3d8' // TODO background picture
  },
  lightGrayBackground: {
    backgroundColor: '#F5F5F5'
  },
  whiteBackground: {
    backgroundColor: 'white'
  },
  paddingTop: {
    paddingTop: 10
  },
  fullHeight: {
    height: '100%'
  },
  dropdown: {
    border: 'none',
    width: '80%'
  },
  padding: {
    padding: 10
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10
  }
};

@withStyles(styles)
@connect(state => { return { courses: state.config.courses.courses }; }, { push, scheduleSession })
export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: "",
      assignment: "",
      time: new Date(),
      duration: ""
    }
  }

  render() {
    let { classes, scheduleSession, push, courses } = this.props;

    return (
      <Flex column grow={1}>
        <Flex
          column align='center' justify='center' grow={3}
          className={classes.title}
        >
          <Text
            color='#fff'
            size={60}
          >
            Eliminate
          </Text>
          <Spacer height={50} />
          <Text
            size={40}
            spacing={5}
          >
            The Grind
          </Text>
        </Flex>
        <Flex column grow={2} className={classNames(classes.lightGrayBackground)}>
          <Flex align='center' justify='space-evenly' grow={2} className={classNames(classes.lightGrayBackground, classes.paddingTop)}>
            <div style={{ height: 190, width: 160 }}>
              <Flex column align='center' justify='center' className={classNames(classes.whiteBackground, classes.fullHeight)}>
                <img src={serverURL + '/assets/teachericon.png'} />
                <Text className={classes.paddingTop}>Course</Text>
                <div style={{ display: 'block', width: 120, height: 1 }} />
                <select value={this.state.course} onChange={(event) => this.setState({ course: event.target.value })} className={classes.dropdown}>
                  <option value=""> </option>
                  {courses ? courses.map((course) => <option value={course.id}>{course.name}</option>) : null}
                </select>
              </Flex>
            </div>
            <div style={{ height: 190, width: 160 }}>
              <Flex column align='center' justify='center' className={classNames(classes.whiteBackground, classes.fullHeight)}>
                <img src={serverURL + '/assets/clipboardicon.png'} />
                <Text>Assignment</Text>
                <div style={{ display: 'block', width: 120, height: 1 }} />
                <TextField placeholder="Assignment" value={this.state.assignment} onChange={(event) => this.setState({ assignment: event.target.value })} className={classes.padding}/>
              </Flex>
            </div>
            <div style={{ height: 190, width: 160 }}>
              <Flex column align='center' justify='center' className={classNames(classes.whiteBackground, classes.fullHeight)}>
                <img src={serverURL + '/assets/timeclockicon.png'} />
                <Text>How Long?</Text>
                <div style={{ display: 'block', width: 120, height: 1 }} />
                <TextField placeholder="Duration (minutes)" value={this.state.duration} onChange={(event) => this.setState({ duration: event.target.value })} className={classes.padding} />
              </Flex>
            </div>
          </Flex>
          <Button
            className={classes.button}
            raised
            color='primary'
            onClick={() => {
              this.setState({ schedule: new Date(this.state.schedule) });
              scheduleSession(this.state.course, this.state.assignment, this.state.time, this.state.duration);
              push('/newbie/finding');
            }}
          >
            Request
          </Button>
        </Flex>
        <Spacer height='20px' />
      </Flex>
    );
  }
}