import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import Text from './Text';
import Button from './Button';

const styles = ({ palette: { primary, getContrastText }, spacing }) => ({
  footer: {
    backgroundColor: primary[700],
    padding: spacing.unit
  }
});

@withStyles(styles)
export default class AppFooter extends Component {
  render() {
    let { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <Text color="white" align="center">
          Peer Genius &copy; 2017 All Rights Reserved
        </Text>
        <Text size='8pt' color='white' align='center'>
          <a style={{color: 'white', textDecoration: 'none'}}href='http://dragonkimfoundation.org/'>Powered by the Dragon Kim Foundation</a>
        </Text>
      </footer>
    );
  }
}