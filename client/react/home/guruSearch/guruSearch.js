import React from 'react';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import { Text } from '../../components';

let styles = {
  headerBackground: {
    backgroundImage: '#00aeb7, url(assets/guru_search.jpg)',
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  headerText: {
    paddingTop: 150,
    paddingBottom: 150
  },
  centerText: {
    textAlign: 'center'
  }
};

@withStyles(styles)
export default class GuruSearch extends React.Component {
  render = () => {
    let { classes } = this.props;

    return (
      <div>
        <div>
          <Text
            type='display2' color='white'
            className={classNames(classes.centerText, classes.headerText)}>Eliminate</Text>
          <Text type='display1' color='black' className={classNames(classes.centerText, classes.headerText)}>The
            Grind</Text>
        </div>
      </div>
    );
  };
}
