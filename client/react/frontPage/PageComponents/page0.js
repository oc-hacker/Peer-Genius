import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Page from './Page';
import { Button, Spacer, Text } from '../../components';

import PeerGeniusLogo from '../../components/Logo';

import classNames from 'classnames';

const styles = {
  withColor: {
    backgroundColor: 'white'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    borderRadius: 10,
    borderColor: 'rgba(249,202,120, 0.9)'
  },
  background: {
    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%), url(assets/home_page_1st.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
    backgroundPosition: '-50% 0%'
  },
};

@withStyles(styles)
export default class PageZero extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    openLogIn: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired
  };

  render() {
    let { classes, currentPage, openLogIn, createAccount } = this.props;

    return (
      <Page
        page={0} currentPage={currentPage}
        className={classNames(classes.withColor, classes.background)}
      >
        <PeerGeniusLogo height="50%" width="50%" />
        <Text type="button" color="rgb(1,147,172)" size="200%" fontWeight="bold">ELIMINATE THE GRIND</Text>
        <Spacer height='3%' />
        <div className={classes.buttonContainer}>
          <Button
            raised color="primary"
            onClick={openLogIn}
            className={classes.button}
          >
            <Text type="button" fontWeight='bold'>Log In</Text>
          </Button>
          <Spacer height="20px" />
          <Button
            raised color="rgba(249,202,120, 0.9)"
            onClick={createAccount}
            className={classes.button}
          >
            <Text type="button" fontWeight='bold'>Create Account</Text>
          </Button>
        </div>
      </Page>
    );
  }
}
