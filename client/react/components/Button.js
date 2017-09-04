import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylesheet from 'react-jss';
import classNames from 'classnames';

import { withTheme } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';
import Button from 'material-ui/Button';

const getColor = (props, shade = 500) => {
    let { theme: { palette }, color } = props;
    if (color in palette) {
        return palette[color][shade];
    }
    else {
        return color;
    }
};

const getContrastColor = (props, shade) => {
    let { theme: { palette } } = props;
    return palette.getContrastText(getColor(props));
};

const styles = {
    root: {
        cursor: 'pointer',
        boxShadow: 'none',
        borderRadius: props => props.round ? 'max(100vw, 100vh)' : null,
    },
    flat: {
        color: props => getColor(props),
        border: props => props.border ? `1px solid ${getColor(props)}` : null,
        '&:hover': {
            backgroundColor: fade(getColor(props, 'A200'), 0.12)
        }
    },
    raised: {
        backgroundColor: props => getColor(props),
        color: props => getContrastColor(props),

        '&:hover': {
            backgroundColor: props => getColor(props, 700),
            color: props => getContrastColor(props, 700),
        }
    }
};

@withTheme
@stylesheet(styles)
export default class CustomButton extends Component<Props, void> {
    static propTypes = {
        /** Can be one of MUI's theme colors, or a css color string */
        color: PropTypes.string,
    };

    render() {
        let {
            classes, className, theme, sheet,
            ...others
        } = this.props;

        return (
            <Button
                className={classNames(classes.button, className)}
                {...others}
            />
        );
    }
}