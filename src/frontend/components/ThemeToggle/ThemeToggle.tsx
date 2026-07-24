// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useThemeMode } from '../../providers/ThemeMode.provider';
import { CypressFields } from '../../utils/enums/CypressFields';
import * as S from './ThemeToggle.styled';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <S.ThemeToggle
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-cy={CypressFields.ThemeToggle}
    >
      {isDark ? '☀️' : '🌙'}
    </S.ThemeToggle>
  );
};

export default ThemeToggle;
