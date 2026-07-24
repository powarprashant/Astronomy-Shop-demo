// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { shimmer } from '../../styles/animations';

export const Skeleton = styled.div`
  background: ${({ theme }) => (theme.mode === 'dark' ? '#2A2A38' : '#EEEEF1')};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => (theme.mode === 'dark' ? '#2A2A38' : '#EEEEF1')} 0px,
    ${({ theme }) => (theme.mode === 'dark' ? '#3A3A4A' : '#F7F7F9')} 40px,
    ${({ theme }) => (theme.mode === 'dark' ? '#2A2A38' : '#EEEEF1')} 80px
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;
