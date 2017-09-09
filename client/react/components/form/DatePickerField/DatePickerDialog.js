import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import ArrowRight from 'material-ui-icons/KeyboardArrowRight';
import MenuIcon from 'material-ui-icons/Menu';

import Button from '../../Button';
import DateTable from './DateTable';
import YearMenu from './YearMenu';

const styles = theme => {
  let { palette: { primary, getContrastText }, spacing: { unit } } = theme;
  return {
    dialogTitle: {
      backgroundColor: primary[500],
      position: 'relative',
      minWidth: '60vw'
    },
    dialogTitleText: {
      color: getContrastText(primary[500]),
      cursor: 'default'
    },
    datePickerContent: {
      overflow: 'hidden'
    },
    selectYearIcon: {
      position: 'absolute',
      right: unit,
      top: unit
    },
    monthSelector: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'default'
    }
  };
};

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

@withStyles(styles)
export default class DatePickerDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onSelect: PropTypes.func,

    title: PropTypes.string,
    value: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    /** The date that picker will start on. Defaults to today. */
    initialDate: PropTypes.instanceOf(Date),

    /** 0=Sun, 1=Mon, ...*/
    firstDayOfWeek: PropTypes.number,
    defaultMode: PropTypes.oneOf(['date', 'year']),

    classes: PropTypes.object
  };

  static defaultProps = {
    initialDate: new Date()
  };

  constructor(props) {
    super(props);

    this.state = {
      year: null,
      month: null,
      date: null,
      mode: 'date'
    };
  }

  componentWillMount() {
    let { value, initialDate, defaultMode } = this.props;

    // Initialize initialDate depending on the situation.
    // value set - has original value
    initialDate = value || initialDate;

    this.setState({
      year: initialDate.getFullYear(),
      month: initialDate.getMonth(),
      date: initialDate.getDate(),
      mode: defaultMode
    });
  }

  _openYearSelection = () => {
    this.setState({
      mode: 'year'
    });
  };

  _setYear = year => {
    this.setState({
      year,
      mode: 'date'
    }, this._boundDate);
  };

  _onRequestClose = () => {
    let { defaultMode, onRequestClose } = this.props;

    this.setState({
      mode: defaultMode
    });

    onRequestClose();
  };

  _onConfirmSelect = () => {
    let { year, month, date } = this.state;
    this.props.onSelect(new Date(year, month, date));
  };

  _boundDate = () => {
    let { minDate, maxDate } = this.props;
    let { year, month, date } = this.state;

    // Check minimum date
    if (new Date(year, month, date).getTime() < minDate.getTime()) {
      this.setState({
        year: minDate.getFullYear(),
        month: minDate.getMonth(),
        date: minDate.getDate()
      });
    }
    // Check maximum date
    else if (new Date(year, month, date).getTime() > maxDate.getTime()) {
      this.setState({
        year: maxDate.getFullYear(),
        month: maxDate.getMonth(),
        date: maxDate.getDate()
      });
    }
  };

  _decrementMonth = () => {
    this.setState(state => {
      let { year, month } = state;
      if (month <= 0) {
        return {
          year: year - 1,
          month: month + 11,
          date: null
        };
      }
      else {
        return {
          month: month - 1,
          date: null
        };
      }
    }, this._boundDate);
  };

  _incrementMonth = () => {
    this.setState(state => {
      let { year, month } = state;
      if (month >= 11) {
        return {
          year: year + 1,
          month: month - 11,
          date: null
        };
      }
      else {
        return {
          month: month + 1,
          date: null
        };
      }
    }, this._boundDate);
  };

  /**
   * Controlled component behaviour
   */
  componentWillReceiveProps(nextProps) {
    let { value, initialDate } = this.props;
    value = value || initialDate || new Date();

    this.setState({
      year: value.getFullYear(),
      month: value.getMonth(),
      date: value.getDate()
    });
  }

  render() {
    let {
      classes, title,
      open, minDate, maxDate,
      firstDayOfWeek
    } = this.props;
    let { year, month, date, mode } = this.state;

    if (mode === 'year') {
      return (
        <Dialog
          open={open} onRequestClose={this._onRequestClose}
        >
          <DialogTitle className={classes.dialogTitle}>
            <Typography type="title" classes={{ title: classes.dialogTitleText }}>
              {title}
            </Typography>
            <Typography type="subheading" classes={{ subheading: classes.dialogTitleText }}>
              {months[month]} {date} {year}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <YearMenu
              year={year} setYear={this._setYear}
              minYear={minDate.getFullYear()} maxYear={maxDate.getFullYear()}
            />
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Dialog
        open={open} onRequestClose={this._onRequestClose}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography type="title" classes={{ title: classes.dialogTitleText }}>
            {title}
          </Typography>
          <Typography type="subheading" classes={{ subheading: classes.dialogTitleText }}>
            {months[month]} {date} {year}
          </Typography>
          <IconButton
            color="contrast"
            className={classes.selectYearIcon}
            onClick={this._openYearSelection}
          >
            <MenuIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.datePickerContent}>
          <div className={classes.monthSelector}>
            <IconButton color="primary" onClick={this._decrementMonth}>
              <ArrowLeft />
            </IconButton>
            <Typography>{months[month]} {year}</Typography>
            <IconButton color="primary" onClick={this._incrementMonth}>
              <ArrowRight />
            </IconButton>
          </div>
          <DateTable
            year={year} month={month} date={date} minDate={minDate} maxDate={maxDate}
            firstDayOfWeek={firstDayOfWeek} onSelect={date => this.setState({ date })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            dense color="primary"
            onClick={this._onRequestClose}
          >
            Cancel
          </Button>
          <Button
            dense color="primary" disabled={typeof date !== 'number'}
            onClick={this._onConfirmSelect}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}