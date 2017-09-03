import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';

import { Text } from '../../components';
import Page from './Page';

const styles = {
	withColor: {
		backgroundColor: 'rgba(1,147,172, 0.5)'
    },
    background: {
        backgroundImage: 'linear-gradient(to bottom, rgba(1,147,172, 0.7) 0%,rgba(1,147,172, 0.7) 100%), url(assets/home_page_2nd.jpg)',
        backgroundSize: 'cover',
        overflow: 'hidden'
    },
	button: {
		position: 'absolute',
		bottom: '100%',
		width: '100%',
		padding: '0.5em',
		cursor: 'pointer',
	},
	title: {
		textTransform: 'uppercase',
	},
	body: {
		display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        marginTop: 0,
        marginBottom: 0,
        paddingTop: '25px'
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '20px',
        marginLeft: 40,
        marginRight: 40,
        width: '100%'
    },
    icon: {
        width: '30%',
        fill: 'rgb(242, 201, 128)',
        paddingTop: '15px',
        paddingBottom: '15px'
    },
    sectionDescription: {
        marginBottom: 25,
        width: '70%',
        textAlign: 'center'
    }
};

@withStyles(styles)
export default class PageOne extends React.Component {
	static propTypes = {
		currentPage: PropTypes.number.isRequired,
		next: PropTypes.func.isRequired
	};
	
	render() {
		let { classes, currentPage, next } = this.props;
		
        return (
            <Page
                page={1} currentPage={currentPage}
                className={classNames(classes.withColor, classes.background)}
            >
                <Text type="headline" color="white" gutterBottom={true}>An Effective, Powerful Web Platform Where Students</Text>
                <Text type="headline" color="white" gutterBottom={true}>Teach Other Students</Text>
                <div className={classes.body}>
                    <div className={classes.column}>
                        <svg className={classes.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                        <Text type="subheading" className={classes.sectionDescription}>Receive Quality Tutoring for free</Text>
                    </div>
                    <div className={classes.column}>
                        <svg className={classes.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                        </svg>
                        <Text type="subheading" className={classes.sectionDescription}>Earn Community Service Hours</Text>
                    </div>
                    <div className={classes.column}>
                        <svg className={classes.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                        <Text type="subheading" className={classes.sectionDescription}>Network With Other People</Text>
                    </div>
                </div>
            </Page>
		);
	}
}