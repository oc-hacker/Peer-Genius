import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Flex, Text, Spacer, Button } from '../../components';
import ModePanel from './ModePanel';

const styles = {
  title: {
    // backgroundImage: 'url(assets/)'
    backgroundColor: '#3bb3d8' // TODO background picture
  }
};

@withStyles(styles)
@connect(null, { push })
export default class Schedule extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Flex column grow={1}>
        <Flex
          column align='center' justify='center' grow={3}
          className={classes.title}
        >
          <Text
            color='#fff'
            size={60}
          >
            Eliminate
          </Text>
          <Spacer height={50} />
          <Text
            size={40}
            spacing={5}
          >
            The Grind
          </Text>
        </Flex>
        <Flex column grow={2}>
          <Flex>
            {/* TODO */}
          </Flex>
          <Flex align='center' justify='center'>
            <Button
              round
              onClick={() => {
                // TODO
              }}
            >
              Request
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}