import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { Button, Logo, Text } from '../../components';
import Page from './Page';


const styles = {
    withColor: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    background: {
        backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9) 100%), url(assets/home_page_5th.jpg)',
        backgroundSize: 'cover',
        overflow: 'hidden'
    },
    centerText: {
        textAlign: 'center',
        marginBottom: 10
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10
    }
};

@withStyles(styles)
export default class PageFour extends Component {
    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        createAccount: PropTypes.func.isRequired
    };

    render() {
        let { classes, currentPage, createAccount } = this.props;

        return (
            <Page
                page={4} currentPage={currentPage}
                className={classNames(classes.background, classes.withColor)}
            >
                <Text type="display2" color="black" className={classes.centerText}>Okay, We Know You Want To</Text>
                <Text type="display2" color="black" className={classes.centerText}> So Join The Club</Text>
                <Logo
                    height='256pt'
                    width='256pt'
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 10,
                        marginBottom: 10
                    }}
                />
                <div className={classes.buttons}>
                    <Button
                        raised
                        color="primary"
                        onClick={createAccount}
                        style={styles.button}
                    >
                        Sign Up
                    </Button>
                </div>
            </Page>
        );
    }
}
