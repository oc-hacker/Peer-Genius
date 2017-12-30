import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';
import { push } from 'react-router-redux';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import Flex from '../Flex';
import PeerGeniusLogo from '../Logo';
import { FacebookIcon, GooglePlusIcon, LinkedInIcon, TwitterIcon } from './IconComponents';
import Text from '../Text';
import Button from '../Button';
import { connect } from 'react-redux';

const styles = ({ palette: { grey }, spacing }) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    top: 0,
    left: 0,
    right: 0,

    background: 'transparent',
    padding: `${spacing.unit}px ${spacing.unit * 2}px`,
    borderBottom: `1px solid ${new Color(grey[700]).alpha(0.6)}`,
    boxSizing: 'border-box'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textDecoration: 'none'
  }
});

@connect(null, { push })
@withStyles(styles, { name: 'GuestAppBar' })
class GuestAppBar extends Component {
  render = () => {
    let { className, classes, color, currentPage } = this.props;
    if (currentPage === 1) {
      color = 'white';
    }

    return (
      <AppBar
        elevation={0}
        className={classNames(classes.appBar, className)}
      >
        <Button style={styles.button} onClick={() => this.props.push('/')}>
          <PeerGeniusLogo fill={color} />
        </Button>
        <Flex grow={2} />
        <Button className={classes.button} onClick={() => this.props.push('/aboutUs')}>
          <Text type='subheading' color={color}>
            About Us
          </Text>
        </Button>
        <Flex align="center" justify="space-around" grow={1}>
          <Button style={styles.button}><FacebookIcon color={color} /></Button>
          <Button style={styles.button}><TwitterIcon color={color} /></Button>
          <Button style={styles.button}><GooglePlusIcon color={color} /></Button>
          <Button style={styles.button}><LinkedInIcon color={color} /></Button>
        </Flex>
      </AppBar>
    );
  };
}

GuestAppBar.displayName = 'GuestAppBar';

GuestAppBar.propTypes = {
  color: PropTypes.string
};

GuestAppBar.defaultProps = {
  color: 'black'
};

export default GuestAppBar;
