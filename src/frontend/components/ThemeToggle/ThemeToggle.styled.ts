// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const ThemeToggle = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.15);
  }
`;
