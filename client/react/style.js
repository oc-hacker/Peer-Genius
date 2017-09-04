import Color from 'color';
import { createMuiTheme, createPalette, createTypography } from 'material-ui';
import { orange, deepOrange } from 'material-ui/colors';

const baseTheme = createMuiTheme({});

const typography = createTypography(baseTheme.palette, {
    fontFamily: '"Open Sans", sans-serif',
});
typography.button = {
    ...typography.button,
    textTransform: 'none'
};

export const generateColorScheme = baseColor => {
    const color = new Color(baseColor);
    const lightColor = color.lighten(100 / color.lightness());

    return {
        50: color.desaturate(0.90).hex(),
        100: color.desaturate(0.70).hex(),
        200: color.desaturate(0.50).hex(),
        300: color.desaturate(0.30).hex(),
        400: color.desaturate(0.15).hex(),
        500: color.hex(),
        600: color.darken(0.1).hex(),
        700: color.darken(0.3).hex(),
        800: color.saturate(0.1).darken(0.5).hex(),
        900: color.saturate(0.2).darken(0.7).hex(),
        A100: lightColor.desaturate(0.4).hex(),
        A200: lightColor.desaturate(0.1).hex(),
        A400: lightColor.hex(),
        A700: lightColor.darken(0.2).hex(),
        contrastDefaultColor: 'light'
    };
};

const palette = createPalette({
    primary: generateColorScheme('#7fb8bf'),
    accent: generateColorScheme('#f5bd66')
});

export const muiTheme = {
    ...baseTheme,
    typography,
    palette: {
        ...palette,
        warning: orange,
        danger: deepOrange
    }
};

console.log(muiTheme);
