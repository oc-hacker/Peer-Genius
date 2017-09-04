import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Table, { TableHead, TableBody, TableRow, TableCell } from 'material-ui/Table';

import Button from '../../Button';

import { connect } from 'react-redux';

const weekdays = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

const styles = {
    headCell: {
        textAlign: 'center',
        paddingTop: '0.5em',
        paddingBottom: '0.5em'
    },
    button: {
        minWidth: 32,
        minHeight: 32
    }
};

@withStyles(styles)
export default class DateTable extends Component {
    static propTypes = {
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        date: PropTypes.number,
        minDate: PropTypes.instanceOf(Date),
        maxDate: PropTypes.instanceOf(Date),
        firstDayOfWeek: PropTypes.number.isRequired,
        onSelect: PropTypes.func, // Called when a date button is selected

        className: PropTypes.string
    };

    _dateCount = () => {
        let { year, month } = this.props;
        switch (month) {
            case 1: // Feb
                return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
            case 3: // Apr
            case 5: // Jun
            case 8: // Sep
            case 10: // Nov
                return 30;
            default:
                return 31;
        }
    };

    _makeBody = () => {
        let {
            classes,
            year, month, firstDayOfWeek,
            onSelect
        } = this.props;

        // startDate is the date of the top left cell on the table. It is 0 or negative, to fill in spots for the previous month.
        let startDate = firstDayOfWeek - (new Date(year, month, 1).getDay());
        if (startDate > 0) {
            startDate -= 7;
        }
        let maxDate = this._dateCount();

        let rows = [];
        for (let date = startDate + 1; date < maxDate; date += 7) {
            rows.push(
                <TableRow>
                    {weekdays.map((_, index) => {
                        let d = new Date(year, month, date + index);
                        let enabled = d.getMonth() === month;

                        return (
                            <TableCell compact>
                                <Button
                                    disabled={!enabled} dense color="primary"
                                    raised={enabled && d.getDate() === this.props.date}
                                    round
                                    classes={{
                                        dense: classes.button
                                    }}
                                    onClick={() => onSelect(d.getDate())}
                                >
                                    {d.getDate()}
                                </Button>
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        }

        return rows;
    };

    render() {
        let { classes, className, firstDayOfWeek } = this.props;

        const offsetWeekdays = [...weekdays];
        offsetWeekdays.push(...offsetWeekdays.splice(0, firstDayOfWeek));


        return (
            <Table className={className}>
                <TableHead>
                    {offsetWeekdays.map(weekday => (
                        <TableCell compact className={classes.headCell}>
                            {weekday}
                        </TableCell>
                    ))}
                </TableHead>
                <TableBody>
                    {this._makeBody()}
                </TableBody>
            </Table>
        );
    }
}