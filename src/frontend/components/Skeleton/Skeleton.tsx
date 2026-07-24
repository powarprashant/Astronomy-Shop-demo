// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import * as S from './Skeleton.styled';

interface IProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px' }: IProps) => (
  <S.Skeleton style={{ width, height, borderRadius }} aria-hidden="true" />
);

export default Skeleton;
