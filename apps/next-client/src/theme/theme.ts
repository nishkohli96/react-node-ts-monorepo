/**
 * https://mui.com/material-ui/customization/css-theme-variables/configuration/
 * https://mui.com/material-ui/customization/dark-mode/
 */

'use client';

import { createTheme, type Theme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import {
  LightThemePalette,
  DarkThemePalette,
  CommonColorPalette
} from './palette';
import { colorSchemeAttribute } from './constants';

const roboto = Roboto({
  weight: [
    '300',
    '400',
    '500',
    '700'
  ],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
});

export const theme: Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: colorSchemeAttribute,
  },
  colorSchemes: {
    light: {
      palette: {
        ...CommonColorPalette,
        ...LightThemePalette,
      },
    },
    dark: {
      palette: {
        ...CommonColorPalette,
        ...DarkThemePalette,
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 350,
      md: 768,
      lg: 1024,
      xl: 1400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
