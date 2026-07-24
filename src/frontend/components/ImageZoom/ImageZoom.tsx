// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { CypressFields } from '../../utils/enums/CypressFields';
import * as S from './ImageZoom.styled';

interface IProps {
  src: string;
  alt: string;
  dataCy?: string;
}

const ImageZoom = ({ src, alt, dataCy }: IProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.currentTarget.style.setProperty('--zoom-x', `${x}%`);
    e.currentTarget.style.setProperty('--zoom-y', `${y}%`);
  };

  return (
    <>
      <S.ZoomWrapper
        $src={src}
        onClick={() => setOpen(true)}
        onMouseMove={handleMouseMove}
        role="button"
        tabIndex={0}
        aria-label={`Zoom in on ${alt}`}
        data-cy={dataCy ?? CypressFields.ProductImageZoomTrigger}
      >
        <S.ZoomHint>Click to zoom</S.ZoomHint>
      </S.ZoomWrapper>
      {open && (
        <S.Lightbox onClick={() => setOpen(false)} data-cy={CypressFields.ProductImageLightbox}>
          <S.LightboxImage $src={src} onClick={(e) => e.stopPropagation()} />
          <S.CloseButton onClick={() => setOpen(false)} aria-label="Close">
            ×
          </S.CloseButton>
        </S.Lightbox>
      )}
    </>
  );
};

export default ImageZoom;
