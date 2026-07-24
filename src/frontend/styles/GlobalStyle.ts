// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { createGlobalStyle } from 'styled-components';

// Theme-dependent globals only. Static resets (box-sizing, layout, fonts)
// live in globals.css since they never vary between light/dark mode.
const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fonts.semiBold};
    transition: background ${({ theme }) => theme.transitions.normal}, color ${({ theme }) => theme.transitions.normal};
  }
`;

export default GlobalStyle;
