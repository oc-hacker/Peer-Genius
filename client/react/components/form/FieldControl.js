import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import Flex from '../Flex';

const styles = ({ palette: { grey, error }, spacing }) => ({
    root: {
        position: 'relative',
        flexGrow: 1,
        marginBottom: spacing.unit * 3
    }
});

@withStyles(styles)
export default class FieldControl extends Component {
    static propTypes = {
        error: PropTypes.any,
        warning: PropTypes.any
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {
            classes, className,
            error, warning,
            children,
            ...others
        } = this.props;

        return (
            <Flex
                className={classNames(classes.root, className)}
                align="center"
                {...others}
            >
                {React.Children.map(children, child => {
                    return child.type.$$errorDisplay
                        ? React.cloneElement(child, {
                            error,
                            warning
                        })
                        : child;
                })}
            </Flex>
        );
    }
}