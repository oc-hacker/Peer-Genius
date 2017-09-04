import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { yellow } from 'material-ui/colors';
import StarIcon from 'material-ui-icons/Star';
import StarBorderIcon from 'material-ui-icons/StarBorder';

import { connect } from 'react-redux';

const styles = ({ spacing }) => ({
    icon: {
        margin: spacing.unit,
        color: yellow[700],
        cursor: 'pointer'
    }
});

@withStyles(styles)
export default class Star extends Component {
    static propTypes = {
        selected: PropTypes.bool,
    };

    render() {
        let { classes, selected, ...others } = this.props;

        return selected ? (
            <StarIcon
                className={classes.icon}
                {...others}
            />
        ) : (
            <StarBorderIcon
                className={classes.icon}
                {...others}
            />
        );
    }
}