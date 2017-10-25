import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Flex, Text, Spacer, Button } from '../../components';

import BounceLoader from 'halogen/BounceLoader';

const Finding = @withStyles({
    centerFlex: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
}) class Finding extends React.Component {
    render = () => {
        let { classes } = this.props;
        return (
        <div style={{margin: 'auto'}}>
            <BounceLoader color="black" size="300px" margin="auto" style={{margin: 'auto'}}/>
            <Text style={{textAlign: 'center', paddingTop: 20}}><b>Finding a guru...</b></Text>
        </div>
        );
    }
}

export default Finding;