// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.breakpoints.desktop} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.sizes.mMedium};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  ${({ theme }) => theme.breakpoints.desktop} {
    max-width: 320px;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.otelBlue};
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;
