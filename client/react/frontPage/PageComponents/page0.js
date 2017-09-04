import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { Text, Spacer, Button } from '../../components';
import Page from './Page';

import PeerGeniusLogo from '../../components/Logo';

const styles = {
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10
    }
};

@withStyles(styles)
export default class PageZero extends Component {
    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        openLogIn: PropTypes.func.isRequired,
        createAccount: PropTypes.func.isRequired
    };

    render() {
        let { classes, currentPage, openLogIn, createAccount } = this.props;

        return (
            <Page
                page={0} currentPage={currentPage}
                bg="white"
            >
                <PeerGeniusLogo height="50%" width="50%" />
                <Text type="button" color="rgb(1,147,172)" size="200%" weight="bold">Eliminate the Grind</Text>
                <Spacer height='3%' />
                <div className={classes.buttons}>
                    <Button
                        raised color="primary"
                        onClick={openLogIn}
                        style={styles.buttons}
                    >
                        Log In
                    </Button>
                    <Spacer height="20px" />
                    <Button
                        raised color="transparent"
                        onClick={createAccount}
                        style={styles.buttons}
                    >
                        Create Account
                    </Button>
                </div>
            </Page>
        );
    }
}
