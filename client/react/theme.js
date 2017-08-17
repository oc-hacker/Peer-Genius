import { createMuiTheme, createPalette, createTypography } from 'material-ui';
import { lightBlue, blue } from 'material-ui/colors';

const baseTheme = createMuiTheme({});

const typography = createTypography(baseTheme.palette, {
	fontFamily: '"Times New Roman", serif'
});

export const muiTheme = {
	...baseTheme,
	typography
};
