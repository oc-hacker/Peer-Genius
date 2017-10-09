import React from 'react';
import ProgressBar from 'react-progressbar.js';
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
    width: '20%'
  },
  previousSessionContainer: {
    padding: '50px 0'
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
          <div className={classes.buttonContainer}>
            <Button
              color="primary"
              onClick={() => push('/newbie/schedule')}
            >
              <Text type="button" color='white' weight='bold'>REQUEST FOR ANOTHER SESSION</Text>
            </Button>
          </div>
        </div>
        <PreviousSession/>
      </Flex>
    );
  };
}
