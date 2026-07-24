// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { DefaultTheme } from 'styled-components';

const sharedTokens = {
  breakpoints: {
    desktop: '@media (min-width: 768px)',
  },
  sizes: {
    mxLarge: '22px',
    mLarge: '20px',
    mMedium: '14px',
    mSmall: '12px',
    dxLarge: '58px',
    dLarge: '40px',
    dMedium: '18px',
    dSmall: '16px',
    nano: '8px',
  },
  fonts: {
    bold: '800',
    regular: '500',
    semiBold: '700',
    light: '400',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    xxl: '64px',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.25s ease',
  },
};

export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    otelBlue: '#5262A8',
    otelYellow: '#EAAA3B',
    otelGray: '#403F4B',
    otelRed: '#FB7181',
    backgroundGray: 'rgba(64, 63, 75, 0.1)',
    lightBorderGray: 'rgba(82, 98, 168, 0.3)',
    borderGray: '#2E2437',
    textGray: '#29293E',
    textLightGray: '#78788C',
    white: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#29293E',
  },
  ...sharedTokens,
};

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    otelBlue: '#5262A8',
    otelYellow: '#EAAA3B',
    otelGray: '#403F4B',
    otelRed: '#FB7181',
    backgroundGray: 'rgba(255, 255, 255, 0.08)',
    lightBorderGray: 'rgba(82, 98, 168, 0.4)',
    borderGray: '#4A4358',
    textGray: '#E8E8F0',
    textLightGray: '#A8A8B8',
    white: '#FFFFFF',
    background: '#121218',
    surface: '#1E1E2A',
    text: '#E8E8F0',
  },
  ...sharedTokens,
};

const Theme: DefaultTheme = lightTheme;

export default Theme;
