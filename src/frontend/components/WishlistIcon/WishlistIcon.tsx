// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useWishlist } from '../../providers/Wishlist.provider';
import { CypressFields } from '../../utils/enums/CypressFields';
import * as S from './WishlistIcon.styled';

const WishlistIcon = () => {
  const { wishlist } = useWishlist();

  return (
    <S.WishlistIcon href="/wishlist" data-cy={CypressFields.WishlistIcon} aria-label="View wishlist">
      ♥
      {!!wishlist.length && <S.ItemsCount data-cy={CypressFields.WishlistItemCount}>{wishlist.length}</S.ItemsCount>}
    </S.WishlistIcon>
  );
};

export default WishlistIcon;
