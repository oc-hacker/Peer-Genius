import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Text from '../components/Text';
import Button from '../components/Button';
import { Flex } from '../components';
import PreviousSession from './previousSession';

let styles = {
  headerBackground: {
    backgroundImage: 'linear-gradient(to bottom, rgba(138, 0, 222, 0.8) 0%,rgba(171, 15, 175, 0.65) 100%), url(assets/newbie_dashboard.jpg)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  headerText: {
    paddingTop: 50,
    paddingBottom: 50
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
  previousSessionContainer: {
    padding: '50px 0'
  },
  textAlignCenter: {
    textAlign: 'center'
  }
};

@withStyles(styles)
@connect(null, {push})
export default class NewbieDashboard extends React.Component {
  render = () => {
    let { classes, currentHours, push } = this.props;
    if (!currentHours) {
      currentHours = 25;
    }
    let notifications = null;

    return (
      <Flex column grow={1}>
        <div className={classNames(classes.headerText, classes.headerBackground)}>
          <Text
            type='display1'
            color='white'
            className={classNames(classes.centerText, classes.headerText)}
          >
            YOUR DASHBOARD
          </Text>
          <Flex justify='center' align='center' column grow={0} >
            <Button
              className={classes.buttonContainer}
              style={{borderRadius: '5px'}}
              color="primary"
              onClick={() => push('/newbie/schedule')}
            >
              <Text 
                type="button"
                color='white'
                fontWeight='bold'
                className={classes.textAlignCenter}
              >
                REQUEST FOR ANOTHER SESSION
              </Text>
            </Button>
            <Button
              className={classes.buttonContainer}
              style={{borderRadius: '5px'}}
              color="primary"
              onClick={() => window.open('https://res.cloudinary.com/jasonftw/image/upload/fl_attachment/v1546620326/MOCK_AMC10_1.pdf', '_blank')}
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
              style={{borderRadius: '5px'}}
              color="primary"
              onClick={() => push('/stream')}
            >
              <Text
                type='button'
                color='white'
                fontWeight='bold'
                className={classes.textAlignCenter}
              >
                AMC 10 Mock Exam Office Hours
              </Text>
            </Button>
          </Flex>
        </div>
        <PreviousSession />
      </Flex>
    );
  };
}
