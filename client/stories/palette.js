import React, { Component } from 'react';
import stylesheet from 'react-jss';

import Flex from '../react/components/Flex';

import { muiTheme } from '../react/style';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const { palette: { primary, accent } } = muiTheme;

const styles = {
    cell: {
        textAlign: 'center',
        width: '4em',
        height: '2em',
        margin: '0.5em 1em',
        backgroundColor: props => props.color
    }
};

@stylesheet(styles)
class TableCell extends Component {
    render() {
        let { classes, sheet, ...others } = this.props;

        return (
            <td
                className={classes.cell}
                {...others}
            />
        );
    }
}


storiesOf('Palette', module)
    .add('palette', () => (
        <table>
            <tr>
                <TableCell color={primary[50]}>primary[50]</TableCell>
                <TableCell color={primary[100]}>primary[100]</TableCell>
                <TableCell color={primary[200]}>primary[200]</TableCell>
                <TableCell color={primary[300]}>primary[300]</TableCell>
                <TableCell color={primary[400]}>primary[400]</TableCell>
                <TableCell color={primary[500]}>primary[500]</TableCell>
                <TableCell color={primary[600]}>primary[600]</TableCell>
                <TableCell color={primary[700]}>primary[700]</TableCell>
                <TableCell color={primary[800]}>primary[800]</TableCell>
                <TableCell color={primary[900]}>primary[900]</TableCell>
                <TableCell color={primary.A100}>primary.A100</TableCell>
                <TableCell color={primary.A200}>primary.A200</TableCell>
                <TableCell color={primary.A400}>primary.A400</TableCell>
                <TableCell color={primary.A700}>primary.A700</TableCell>
            </tr>
            <tr>
                <TableCell color={accent[50]}>accent[50]</TableCell>
                <TableCell color={accent[100]}>accent[100]</TableCell>
                <TableCell color={accent[200]}>accent[200]</TableCell>
                <TableCell color={accent[300]}>accent[300]</TableCell>
                <TableCell color={accent[400]}>accent[400]</TableCell>
                <TableCell color={accent[500]}>accent[500]</TableCell>
                <TableCell color={accent[600]}>accent[600]</TableCell>
                <TableCell color={accent[700]}>accent[700]</TableCell>
                <TableCell color={accent[800]}>accent[800]</TableCell>
                <TableCell color={accent[900]}>accent[900]</TableCell>
                <TableCell color={accent.A100}>accent.A100</TableCell>
                <TableCell color={accent.A200}>accent.A200</TableCell>
                <TableCell color={accent.A400}>accent.A400</TableCell>
                <TableCell color={accent.A700}>accent.A700</TableCell>
            </tr>
        </table>
    ));
