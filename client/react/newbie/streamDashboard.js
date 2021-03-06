import React, { Component } from 'react';
import { Flex, Text, Button, Spacer } from '../components';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { scheduleSession } from '../../redux/actions/creators/PGsession';
import { STREAM_LINK } from '../../config';

const styles = {
  headerBackground: {
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 113, 255, 1) 0%, rgba(0, 173, 255, 1) 100%)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  headerText: {
    paddingTop: 50,
    paddingBottom: 50,
    textTransform: 'uppercase'
  },
  centerText: {
    textAlign: 'center'
  },
  buttonContainer: {
    display: 'block',
    borderStyle: 'solid',
    borderColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '25%'
  },
  buttonOutline: {
    justifyContent: 'center',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderColor: 'white',
    height: '100%',
    width: '100%'
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
};

@withStyles(styles)
@connect(null, { push, scheduleSession })
export default class StreamDashboard extends Component {
  render = () => {
    const { classes, push, scheduleSession } = this.props;
    return (
      <Flex column grow={1}>
        <div className={classNames(classes.headerText, classes.headerBackground)}>
          <Text
            type='display1'
            color='white'
            className={classNames(classes.centerText, classes.headerText)}
          >
            AMC 10 Mock Exam - Office Hours
          </Text>
          <Button
            className={classes.buttonContainer}
            style={{borderRadius: '5px'}}
            color="primary"
            onClick={() => window.open('https://res.cloudinary.com/jasonftw/image/upload/fl_attachment/v1547625044/MOCK_AMC10_b.pdf', '_blank')}
          >
            <Text
              type='button'
              color='white'
              fontWeight='bold'
              className={classes.textAlignCenter}
            >
              Download AMC 10 Mock Exam #1
            </Text>
          </Button>
          <Button
            className={classes.buttonContainer}
            raised
            color='primary'
            onClick={() => {
              scheduleSession('amc10', '', new Date(), '10');
              push('/newbie/finding');
            }}
          >
            <Text
              type='button'
              color='white'
              fontWeight='bold'
              className={classes.textAlignCenter}
            >
              Request a 1:1 Tutor
            </Text>
          </Button>
          <Spacer height='20px' />
        </div>
        <div className={classes.center}>
          <iframe
            title='AMC 10 Digital Office Hours'
            width='960'
            height='540'
            src={STREAM_LINK}
            frameborder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
          />
        </div>
      </Flex>
    );
  }
}