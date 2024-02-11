import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'redux-store';
import { PaletteMode } from '@mui/material';

interface SettingsConfig {
  mode: PaletteMode;
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

const initialState: SettingsConfig = {
  /* Uses system theme as default */
  mode:
    window.matchMedia
    && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemeMode.DARK
      : ThemeMode.LIGHT,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.mode
        = state.mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    },
  },
});

/* Actions */
export const { toggleTheme } = settingsSlice.actions;

/* Selectors */
export const ThemeSelector = (state: RootState) =>
  state.appConfig.settings.mode;
