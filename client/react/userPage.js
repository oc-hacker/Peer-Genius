import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import { AppFooter, Flex, UserAppBar } from './components';
import UserRouter from './userRouter';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  body: {
    // maxHeight: 'calc(100vh - 53px)', // TODO is there a better way, without hard-coding the header height?
    overflowY: 'auto'// Allow scroll when needed
  }
};

@withStyles(styles)
/**
 * All things that require the user to be logged in go here.
 */
export default class UserPage extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Flex column className={classes.root}>
        <UserAppBar />
        <Flex grow={1} className={classes.body}>
          <UserRouter />
        </Flex>
        <AppFooter />
      </Flex>
    );
  }
}