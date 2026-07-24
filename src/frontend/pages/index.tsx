// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import ProductToolbar, { SortOption } from '../components/ProductToolbar';
import Skeleton from '../components/Skeleton';
import * as S from '../styles/Home.styled';
import { useQuery } from '@tanstack/react-query';
import ApiGateway from '../gateways/Api.gateway';
import Banner from '../components/Banner';
import { CypressFields } from '../utils/enums/CypressFields';
import { useCurrency } from '../providers/Currency.provider';
import { moneyToNumber } from '../utils/money';

const SKELETON_CARD_COUNT = 6;

const Home: NextPage = () => {
  const { selectedCurrency } = useCurrency();
  const { data: productList = [], isLoading } = useQuery({
    queryKey: ['products', selectedCurrency],
    queryFn: () => ApiGateway.listProducts(selectedCurrency),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const categories = useMemo(
    () => Array.from(new Set(productList.flatMap((p) => p.categories))).sort(),
    [productList]
  );

  const filteredProductList = useMemo(() => {
    let list = productList;

    if (searchTerm.trim()) {
      const query = searchTerm.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    if (category !== 'all') {
      list = list.filter((p) => p.categories.includes(category));
    }

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => moneyToNumber(a.priceUsd) - moneyToNumber(b.priceUsd));
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => moneyToNumber(b.priceUsd) - moneyToNumber(a.priceUsd));
        break;
      case 'name-asc':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return list;
  }, [productList, searchTerm, category, sortBy]);

  return (
    <Layout>
      <Head>
        <title>Otel Demo - Home</title>
      </Head>
      <S.Home data-cy={CypressFields.HomePage}>
        <Banner />
        <S.Container>
          <S.Row>
            <S.Content>
              <S.HotProducts>
                <S.HotProductsTitle data-cy={CypressFields.HotProducts} id="hot-products">
                  Hot Products
                </S.HotProductsTitle>
                <ProductToolbar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  categories={categories}
                  category={category}
                  onCategoryChange={setCategory}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
                {isLoading ? (
                  <S.SkeletonGrid>
                    {Array.from({ length: SKELETON_CARD_COUNT }, (_, i) => (
                      <S.SkeletonCard key={i}>
                        <Skeleton height="200px" borderRadius="8px" />
                        <Skeleton height="16px" width="70%" />
                        <Skeleton height="16px" width="40%" />
                      </S.SkeletonCard>
                    ))}
                  </S.SkeletonGrid>
                ) : filteredProductList.length ? (
                  <ProductList productList={filteredProductList} />
                ) : (
                  <p>No products match your search.</p>
                )}
              </S.HotProducts>
            </S.Content>
          </S.Row>
        </S.Container>
      </S.Home>
    </Layout>
  );
};

export default Home;
