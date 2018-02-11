import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import SearchIcon from 'material-ui-icons/Search';

import Flex from '../Flex';

const styles = ({ palette: { primary, grey }, spacing }) => ({
  root: {
    position: 'relative',
  },
  input: {
    flexGrow: 1,
    border: `1px solid ${grey[300]}`,
    borderRadius: spacing.unit,
    padding: spacing.unit,

    '&:focus': {
      outline: 'none',
      borderColor: primary[700],
      boxShadow: `0 0 ${spacing.unit / 2}px ${primary[700]}`
    }
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: spacing.unit * 2
  }
});

const SearchBar =
  withStyles(styles, { name: 'SearchBar' })(
    props => {
      let { className, classes, ...others } = props;

      return (
        <Flex grow={1} className={classNames(classes.root, className)}>
          <input
            className={classes.input}
            {...others}
          />
          <Flex column justify="center" className={classes.iconContainer}>
            <SearchIcon />
          </Flex>
        </Flex>
      );
    }
  );

SearchBar.displayName = 'SearchBar';

export default SearchBar;