import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Flex, Text, Spacer, Button } from '../../components';
import ModePanel from './ModePanel';

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
  }
};

@withStyles(styles)
@connect(null, { push })
export default class Schedule extends Component {
  render() {
    let { classes } = this.props;

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
          <Flex row align='center' justify='space-evenly' grow={2} className={classNames(classes.lightGrayBackground, classes.paddingTop)}>
            <div style={{ height: 190, width: 160 }}>
              <Flex column align='center' justify='center' className={classNames(classes.whiteBackground, classes.fullHeight)}>
                <img src={serverURL + '/assets/teachericon.png'}/>
                <Text className={classes.paddingTop}>Course</Text>
                <div style={{ display: 'block', width: 120, height: 1 }} />
              </Flex>
            </div>
            <div style={{ height: 190, width: 160 }}>
              <Flex column align='center' justify='center' className={classNames(classes.whiteBackground, classes.fullHeight)}>
                <img src={serverURL + '/assets/clipboardicon.png'}/>
                <Text>Assignment</Text>
                <div style={{ display: 'block', width: 120, height: 1 }} />
              </Flex>
            </div>
            <div style={{ height: 190, width: 160 }}>
              <Flex column align='center' justify='center' className={classNames(classes.whiteBackground, classes.fullHeight)}>
                <img src={serverURL + '/assets/calendaricon.png'}/>
                <Text>Schedule</Text>
                <div style={{ display: 'block', width: 120, height: 1 }} />
              </Flex>
            </div>
            <div style={{ height: 190, width: 160 }}>
              <Flex column align='center' justify='center' className={classNames(classes.whiteBackground, classes.fullHeight)}>
                <img src={serverURL + '/assets/timeclockicon.png'}/>
                <Text>How Long?</Text>
                <div style={{ display: 'block', width: 120, height: 1 }} />
              </Flex>
            </div>
          </Flex>
          <Button
            round
            onClick={() => {
              // TODO
            }}
          >
            Request
          </Button>
        </Flex>
      </Flex>
    );
  }
}