import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { change, FormSection, getFormValues } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Checkbox from 'material-ui/Checkbox';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import ArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';

import { connect } from 'react-redux';

import { CheckboxField } from '../form';

import { selectSubjects } from '../../../redux/selectors/config';

const decamelize = camelCaseWord =>
  camelCaseWord
    .split('')
    .map((char, index) => {
      if (index === 0) {
        return char.toUpperCase();
      }
      else {
        return char.toUpperCase() === char ? ` ${char}` : char;
      }
    })
    .join('');

const styles = ({ palette: { text }, transitions, spacing }) => ({
  categoryListItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 0
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',


  },
  button: {
    padding: 0,
    paddingRight: spacing.unit,
    backgroundColor: 'transparent',
    transition: transitions.create('background-Color', {
      duration: transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: text.divider
    },

    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholderCheckbox: {
    visibility: 'hidden'
  },
  liText: {
    textAlign: 'left',
    flexGrow: 1
  },
  liCheckbox: {
    position: 'absolute',
    left: 0
  },
  listContainer: {
    overflow: 'hidden',
    transition: 'all 0.5s ease'
  },
  subjectListItem: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: spacing.unit * 6
  }
});

@connect((state, props) => {
  let values = getFormValues(props.form)(state);
  if (values) {
    values = values[props.category];
  }

  return {
    subjects: selectSubjects(state)[props.category],
    values: values || {}
  };
}, {
  change
})
@withStyles(styles)
export default class CategoryListItem extends Component {
  static propTypes = {
    form: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired, // Programmatic category name
    onClick: PropTypes.func,
    open: PropTypes.bool // Whether the sublist is open
  };

  constructor(props) {
    super(props);

    this._list = null;
  }

  /**
   * Determines current selection status.
   * Returns one of 'unselected, 'indeterminate', and 'selected'
   * @private
   */
  _getSelectionStatus = () => {
    let { subjects, values } = this.props;

    let subjectCount = Object.keys(subjects).length;
    let totalValue = 0;
    for (let selection of Object.values(values)) {
      totalValue += Boolean(selection);
    }

    if (totalValue === 0) {
      return 'unselected';
    }
    else if (totalValue >= subjectCount) {
      return 'selected';
    }
    else {
      return 'indeterminate';
    }
  };

  _toggleCategory = async () => {
    let { change, form, category, subjects } = this.props;

    // Determine current selection status
    let currentStatus = this._getSelectionStatus();

    if (currentStatus === 'selected') {
      // Unselect all
      for (let subject in subjects) {
        change(form, `${category}.${subject}`, false);
      }
    }
    else {
      // Select all
      for (let subject in subjects) {
        change(form, `${category}.${subject}`, true);
      }
    }

    this.forceUpdate();
  };

  render() {
    let {
      classes,
      subjects, category,
      onClick, open
    } = this.props;

    let height = open
      ? (this._list ? this._list.clientHeight : 0)
      : 0;
    let selectionStatus = this._getSelectionStatus();

    return (
      <FormSection name={category}>
        <ListItem className={classes.categoryListItem}>
          <div className={classes.buttonContainer}>
            <ButtonBase
              className={classes.button}
              onClick={onClick}
            >
              <Checkbox className={classes.placeholderCheckbox} />
              <ListItemText
                className={classes.liText}
                primary={decamelize(category)}
              />
              {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </ButtonBase>
            <Checkbox
              className={classes.liCheckbox}
              checked={selectionStatus === 'selected'}
              indeterminate={selectionStatus === 'indeterminate'}
              onClick={this._toggleCategory}
            />
          </div>
          <div className={classes.listContainer} style={{ height }}>
            <List rootRef={self => this._list = self}>
              {Object.keys(subjects).map(subject => (
                <ListItem
                  key={subject}
                  className={classes.subjectListItem}
                  button
                >
                  <CheckboxField
                    name={subject}
                    label={subjects[subject]}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </ListItem>
      </FormSection>
    );
  }
}