import React from 'react';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Text from '../components/Text';

let styles = {
  headerBackground: {
    backgroundImage: 'linear-gradient(to bottom, rgba(249,202,120, 0.9) 0%, rgba(249,202,120, 0.9) 100%), url(assets/home_page_3rd.jpg)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  headerText: {
    paddingTop: 150,
    paddingBottom: 150
  },
  centerText: {
    textAlign: 'center'
  },
  textPadding: {
    paddingTop: 10,
    paddingBottom: 10
  },
  coloredBar: {
    background: 'linear-gradient(to bottom, #f4fc00 0%,#00aeb7 100%)',
    borderRadius: 5,
    zIndex: 10
  },
  emptyBar: {
    boxShadow: 'inset 3px 3px 3px 3px gray',
    borderRadius: 5,
    border: '1px solid gray'
  },
  leftPadding1: {
    marginleft: 15
  },
  darkGreyBackground: {
    backgroundColor: 'rgb(244, 244, 244)'
  },
  lightGreyBackground: {
    backgroundColor: 'rgb(252, 252, 252)'
  },
  sidePadding: {
    paddingLeft: 300,
    paddingRight: 300
  }
};

@withStyles(styles)
export default class NewbieDashboard extends React.Component {
  render = () => {
    let { classes } = this.props;

    return (
      <div>
        <div>
          <Text type='display2' color='white' className={classNames(classes.centerText, classes.headerText)}>YOUR
            DASHBOARD</Text>
        </div>
        <div className={classNames(classes.sidePadding)}>
          <span>
            <div className={classNames(classes.darkGreyBackground)}>
              <Text type='subheading' color='black' className={classes.leftPadding1}>Notification</Text>
            </div>
            <div className={classNames(classes.lightGreyBackground)}>
              {notifications}
            </div>
          </span>
          <span style={{ width: 15 }} />
          <span>
            <Text type='title' color='black' className={classes.textPadding}>HOUR TIMELINE</Text>
          </span>
        </div>
      </div>
    );
  };
}