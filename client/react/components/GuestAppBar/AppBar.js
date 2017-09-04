import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';

import Flex from '../Flex';
import Logo from '../Logo';
import { FacebookIcon, GooglePlusIcon, LinkedInIcon, TwitterIcon } from './IconComponents';
import SearchBar from './SearchBar';

import PeerGeniusLogo from '../Logo';

const styles = ({ palette: { grey }, spacing }) => ({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        top: 0,
        left: 0,
        right: 0,

        background: 'transparent',
        padding: `${spacing.unit}px ${spacing.unit * 2}px`,
        borderBottom: `1px solid ${new Color(grey[700]).alpha(0.6)}`,
        boxSizing: 'border-box'
    }
});

@withStyles(styles, { name: 'GuestAppBar' })
class GuestAppBar extends Component {
    render = () => {
        let { className, classes, color, currentPage } = this.props;
        if (currentPage === 1) {
            color = 'white';
        }

        return (
            <AppBar
                elevation={0}
                className={classNames(classes.appBar, className)}
            >
                <PeerGeniusLogo fill={color} />
                <Flex grow={2} />
                <Flex align="center" justify="space-around" grow={1}>
                    <FacebookIcon color={color} />
                    <TwitterIcon color={color} />
                    <GooglePlusIcon color={color} />
                    <LinkedInIcon color={color} />
                </Flex>
            </AppBar>
        );
    }
}

GuestAppBar.displayName = 'GuestAppBar';

GuestAppBar.propTypes = {
    color: PropTypes.string
};

GuestAppBar.defaultProps = {
    color: 'black'
};

export default GuestAppBar;
