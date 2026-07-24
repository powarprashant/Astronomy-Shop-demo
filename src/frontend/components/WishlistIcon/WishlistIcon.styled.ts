// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Link from 'next/link';
import styled from 'styled-components';

export const WishlistIcon = styled(Link)`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  text-decoration: none;
`;

export const ItemsCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -6px;
  right: -10px;
  width: 15px;
  height: 15px;
  font-size: ${({ theme }) => theme.sizes.nano};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.otelRed};
`;
