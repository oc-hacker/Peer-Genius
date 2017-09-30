import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import { Flex, Text } from '../../components';

const styles = ({ spacing }) => ({
  cell: {
    padding: spacing.unit
  }
});

let DataRow = props => {
  let { classes, name, value } = props;

  return (
    <tr>
      <td className={classes.cell}>
        <Text>{name}</Text>
      </td>
      <td className={classes.cell}>
        <Text>:</Text>
      </td>
      <td className={classes.cell}>
        <Text color="#959595">{value}</Text>
      </td>
    </tr>
  );
};

DataRow.displayName = 'DataRow';

DataRow = withStyles(styles)(DataRow);

DataRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default DataRow;
