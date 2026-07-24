// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';

export const ZoomWrapper = styled.div<{ $src: string }>`
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  cursor: zoom-in;
  background: ${({ $src }) => `url("${$src}")`} no-repeat center;
  background-size: contain;
  background-position: var(--zoom-x, center) var(--zoom-y, center);
  transition: background-size 0.2s ease;

  &:hover {
    background-size: 180%;
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    height: 500px;
  }
`;

export const ZoomHint = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 12px;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  ${ZoomWrapper}:hover & {
    opacity: 1;
  }
`;

export const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  cursor: zoom-out;
  animation: ${fadeIn} 0.15s ease;
`;

export const LightboxImage = styled.div<{ $src: string }>`
  width: min(90vw, 800px);
  height: min(80vh, 800px);
  background: ${({ $src }) => `url("${$src}")`} no-repeat center;
  background-size: contain;
  cursor: default;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 24px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
