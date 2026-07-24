// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import ProductList from '../../components/ProductList';
import * as S from '../../styles/Wishlist.styled';
import ApiGateway from '../../gateways/Api.gateway';
import { CypressFields } from '../../utils/enums/CypressFields';
import { useCurrency } from '../../providers/Currency.provider';
import { useWishlist } from '../../providers/Wishlist.provider';

const Wishlist: NextPage = () => {
  const { selectedCurrency } = useCurrency();
  const { wishlist } = useWishlist();
  const { data: productList = [] } = useQuery({
    queryKey: ['products', selectedCurrency],
    queryFn: () => ApiGateway.listProducts(selectedCurrency),
  });

  const wishlistedProducts = useMemo(
    () => productList.filter((product) => wishlist.includes(product.id)),
    [productList, wishlist]
  );

  return (
    <Layout>
      <Head>
        <title>Otel Demo - Wishlist</title>
      </Head>
      <S.Container data-cy={CypressFields.WishlistPage}>
        <S.Content>
          <S.Title>Your Wishlist</S.Title>
          {wishlistedProducts.length ? (
            <ProductList productList={wishlistedProducts} />
          ) : (
            <S.EmptyState>
              Your wishlist is empty. <S.EmptyStateLink href="/">Browse products</S.EmptyStateLink> and tap the heart
              icon to save them.
            </S.EmptyState>
          )}
        </S.Content>
      </S.Container>
    </Layout>
  );
};

export default Wishlist;
