import { createMuiTheme, createPalette, createTypography } from 'material-ui';
import { orange } from 'material-ui/colors';

const baseTheme = createMuiTheme({});

const typography = createTypography(baseTheme.palette, {
	fontFamily: '"Times New Roman", serif'
});

const palette = createPalette({
	primary: {
		50: '#bbf4fa',
		100: '#aeebf2',
		200: '#9fdce3',
		300: '#93d3d9',
		400: '#81b6c4',
		500: '#7fb8bf',
		600: '#57a3ad',
		700: '#3792a4',
		800: '#0c6d78',
		900: '#00545c',
		'A100': '#a6fcff',
		'A200': '#8cf5ff',
		'A400': '#66f5ff',
		'A700': '#33eeff',
		contrastDefaultColor: 'dark'
	},
	accent: {
		50: '#ffe0ad',
		100: '#fad3a0',
		200: '#face8c',
		300: '#fac97a',
		400: '#f7c16e',
		500: '#f5bd66',
		600: '#ebaf60',
		700: '#e0a853',
		800: '#cf9642',
		900: '#b0792c',
		'A100': '#ffebcc',
		'A200': '#ffd399',
		'A400': '#ffbd59',
		'A700': '#ffad33',
		contrastDefaultColor: 'dark'
	}
});

export const muiTheme = {
	...baseTheme,
	typography,
	palette
};
