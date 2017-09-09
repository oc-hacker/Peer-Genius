import React from 'react';

import { withStyles } from 'material-ui';

import Text from './components/Text';

import classNames from 'classnames';

const styles = {
    backgroundHeader: {
        backgroundImage: 'linear-gradient(to bottom, rgba(186,85,211, 0.9) 0%, rgba(186,85,211, 0.9) 100%), url(assets/about_us_header.jpg)',
        backgroundSize: 'cover',
        overflow: 'hidden'
    },
    centerText: {
        textAlign: 'center'
    },
    line: {
        width: 100,
        marginTop: 20,
        height: 1,
        backgroundColor: 'rgb(72,209,204)',
        marginBottom: 10
    }
};

@withStyles(styles)
export default class AboutUs extends React.Component {
    render = () => {
        <div>
            <div classNames={classes.backgroundHeader}>
                <Text type='display2' color='white' className={classes.centerText}>ABOUT US</Text>
            </div>
            <div>
                <div>
                    <Text type='display1' color='rgb(72,209,204)' className={classes.centerText}>MEET THE TEAM</Text>
                    <div className={classes.line}/>
                </div>
                <div>
                    <div>
                        
                    </div>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    }
}