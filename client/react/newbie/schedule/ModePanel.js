import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Flex, Text } from '../../components';

const styles = {
  root: {
    borderRadius: 5,
    cursor: 'pointer',

    '&:hover': {
      boxShadow: '0 0 5px rgba(0,0,0,0.5)'
    }
  }
};

@withStyles(styles)
export default class ModePanel extends Component {
  static propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string,
    onClick: PropTypes.func
  };

  render() {
    let { icon, text, classes, onClick } = this.props;

    return (
      <Flex
        column align='center'
        className={classes.root} onClick={onClick}
      >
        {icon}
        <Text>
          {text}
        </Text>
      </Flex>
    );
  }
}