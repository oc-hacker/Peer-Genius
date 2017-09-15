import React from 'react';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { push } from 'react-router-redux';

import Text from '../components/Text';
import ProgressBar from 'react-progressbar';
import Button from '../components/Button';

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
  }
};


@withStyles(styles)
export default class NewbieDashboard extends React.Component {
  render = () => {
    let { classes, currentHours } = this.props;
    if (!currentHours) {
      currentHours = 25;
    }
    let notifications = null;

    return (
      <div style={{ display: 'block', width: '100%' }}>
        <div className={classNames(classes.headerText, classes.headerBackground)}>
          <Text type='display1' color='white' className={classNames(classes.centerText, classes.headerText)}>YOUR
            DASHBOARD</Text>
          <div style={{ display: 'block', borderStyle: 'solid', borderColor: 'white', marginLeft: 'auto', marginRight: 'auto', width: '20%' }}>
            <Button
              color="primary"
              onClick={() => push('/home/schedule')}
            >
              <Text type="button" color='white' weight='bold'>REQUEST FOR ANOTHER SESSION</Text>
            </Button>
          </div>
        </div>
      </div>
    );
  };
}
