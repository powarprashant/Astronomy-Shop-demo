// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 20px;

  ${({ theme }) => theme.breakpoints.desktop} {
    padding: 0 100px;
  }
`;

export const Content = styled.div`
  width: 100%;
  margin-bottom: 20px;

  ${({ theme }) => theme.breakpoints.desktop} {
    margin-top: 60px;
    margin-bottom: 100px;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.sizes.mLarge};
  font-weight: ${({ theme }) => theme.fonts.bold};

  ${({ theme }) => theme.breakpoints.desktop} {
    font-size: ${({ theme }) => theme.sizes.dxLarge};
  }
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLightGray};
`;

export const EmptyStateLink = styled(Link)`
  color: ${({ theme }) => theme.colors.otelBlue};
`;
