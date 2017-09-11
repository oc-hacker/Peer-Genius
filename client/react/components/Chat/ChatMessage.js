import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = ({ palette: { primary, grey }, spacing }) => ({
  root: {
    position: 'relative',
    backgroundColor: grey[200],
    padding: spacing.unit / 2,
    marginLeft: 25,
    borderRadius: 4,

    '&:before': {
      position: 'absolute',
      content: '""',
      right: '100%',
      top: 'auto',
      bottom: 'auto',
      borderWidth: '15px 20px 15px 0',
      borderStyle: 'solid',
      borderColor: ` transparent ${grey[200]}`
    }
  }
});

@withStyles(styles)
export default class ChatMessage extends Component {
  static propTypes = {
    content: PropTypes.string
  };

  static defaultProps = {
    content: ''
  };

  render() {
    let { classes, content } = this.props;
    return (
      <div className={classes.root}>
        {content}
      </div>
    );
  }
}