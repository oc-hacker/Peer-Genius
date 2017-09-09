import Color from 'color';
import { createMuiTheme, createPalette, createTypography } from 'material-ui';
import { deepOrange, orange } from 'material-ui/colors';

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
  const lightColor = color.saturationv(100).lighten(0.30);

  return {
    50: color.lighten(0.45).hex(),
    100: color.lighten(0.40).hex(),
    200: color.lighten(0.30).hex(),
    300: color.lighten(0.20).hex(),
    400: color.lighten(0.10).hex(),
    500: color.hex(),
    600: color.darken(0.1).hex(),
    700: color.darken(0.25).hex(),
    800: color.saturate(0.1).darken(0.3).hex(),
    900: color.saturate(0.2).darken(0.4).hex(),
    A100: lightColor.lighten(0.3).hex(),
    A200: lightColor.lighten(0.1).hex(),
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
