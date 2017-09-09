import React from 'react';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import { Text } from '../../components';

let styles = {
  headerBackground: {
    backgroundImage: '#00aeb7, url(assets/guru_search.jpg)',
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
export default class GuruSearch extends React.Component {
  render = () => {
    let { classes } = this.props;

    return (
      <div>
        <div>
          <Text
            type='display2' color='white'
            className={classNames(classes.centerText, classes.headerText)}>Eliminate</Text>
          <Text type='display1' color='black' className={classNames(classes.centerText, classes.headerText)}>The
            Grind</Text>
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
        </div>
      </div>
    );
  };
}
