// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import RouterLink from 'next/link';

export const Link = styled(RouterLink)`
  text-decoration: none;
`;

export const Image = styled.div<{ $src: string }>`
  width: 100%;
  height: 150px;
  background: ${({ $src }) => `url("${$src}")`} no-repeat center;
  background-size: contain;

  ${({ theme }) => theme.breakpoints.desktop} {
    height: 300px;
  }
`;

export const ProductCard = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const WishlistButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  color: ${({ theme, $active }) => ($active ? theme.colors.otelRed : theme.colors.textLightGray)};
  font-size: 16px;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.15);
  }
`;

export const ProductName = styled.p`
  margin: 0;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.sizes.dSmall};
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.dMedium};
  font-weight: ${({ theme }) => theme.fonts.bold};
`;
