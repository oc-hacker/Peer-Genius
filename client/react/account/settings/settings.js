import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { Flex, Text } from '../../components';
import SettingsItem from './SettingsComponents/SettingsItem';
import EditPassword from './SettingsComponents/password';

const styles = ({ palette: { primary, grey }, spacing }) => ({
  root: {
    boxSizing: 'border-box',
    padding: spacing.unit * 2
  },
  heading: {
    textTransform: 'uppercase',
    margin: `${spacing.unit * 2}px 0`,
    letterSpacing: spacing.unit * 0.3
  },
  divider: {
    height: 1,
    backgroundColor: grey[300],
    margin: `${spacing.unit * 2}px 0`
  },
  headerUnderline: {
    width: '40%',
    marginRight: '60%',
    backgroundColor: grey[700],
  }
});

@withStyles(styles)
export default class Settings extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Flex
        className={classes.root}
        justify="center" grow={1}
      >
        <Flex column basis="60%">
          <Text
            type="title" className={classes.heading}
            color="primary" size="2em" weight={600}
          >
            Setting
          </Text>
          <div className={classNames(classes.divider, classes.headerUnderline)} />
          <Flex column>
            <Text type="subheading" className={classes.heading}>Notifications</Text>
            <Flex>
              <Flex column grow={1} basis={0}>
                <SettingsItem
                  text="Push Notifications"
                />
                <SettingsItem
                  text="Text Message Notifications"
                />
              </Flex>
              <Flex column grow={1} basis={0}>
                <SettingsItem
                  text="Email Settings"
                />
                <SettingsItem
                  text="Phone Preferences"
                />
              </Flex>
            </Flex>
          </Flex>
          <div className={classes.divider} />
          <Flex column>
            <Text type="subheading" className={classes.heading}>Privacy</Text>
            <Flex>
              <SettingsItem
                text="Social"
              />
            </Flex>
          </Flex>
          <div className={classes.divider} />
          <Flex column>
            <Text type="subheading" className={classes.heading}>Security</Text>
            <EditPassword />
          </Flex>
        </Flex>
      </Flex>
    );
  }
}