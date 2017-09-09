import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import SettingsIcon from 'material-ui-icons/Settings';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Flex, Spacer, Text } from '../../../components';

const styles = ({ palette: { primary }, spacing }) => ({
  root: {
    cursor: 'pointer',
    margin: spacing.unit
  }
});

@connect(null, { push })
@withStyles(styles)
export default class SettingsItem extends Component {
  static propTypes = {
    text: PropTypes.string,
    link: PropTypes.string
  };

  render() {
    let { classes, text, link, push } = this.props;

    return (
      <Flex
        className={classes.root}
        onClick={() => link && push(link)}
      >
        <SettingsIcon />
        <Spacer width="1em" />
        <Text color="primary">{text}</Text>
      </Flex>
    );
  }
}