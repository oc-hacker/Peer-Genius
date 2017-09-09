import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = ({ palette, spacing, typography }) => ({
  li: {
    padding: spacing.unit * 0.75
  },
  liTextContainer: {
    padding: 0
  },
  text: {
    color: palette.primary[500],
    textAlign: 'center',
    fontSize: typography.fontSize * 1.5,
    fontWeight: typography.fontWeightRegular
  },
  textDense: {
    fontSize: typography.fontSize * 1.2,
    fontWeight: typography.fontWeightLight
  }
});

@withStyles(styles)
export default class YearMenu extends Component {
  static propTypes = {
    year: PropTypes.number,
    minYear: PropTypes.number,
    maxYear: PropTypes.number,
    setYear: PropTypes.func.isRequired // Called with year when user selects a year.
  };

  render() {
    let { year: currentYear, minYear, maxYear, setYear, classes } = this.props;
    let yearItems = [];

    for (let year = minYear; year <= maxYear; year++) {
      yearItems.push(
        <ListItem
          button onClick={() => setYear(year)}
          dense={year !== currentYear} className={classes.li}
        >
          <ListItemText
            primary={year}
            className={classes.liTextContainer}
            classes={{
              text: classes.text,
              textDense: classNames(classes.text, classes.textDense)
            }}
          />
        </ListItem>
      );
    }

    return (
      <List>
        {yearItems}
      </List>
    );
  }
}