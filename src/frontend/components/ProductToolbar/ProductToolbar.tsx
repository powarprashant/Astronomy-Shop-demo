// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import Select from '../Select';
import { CypressFields } from '../../utils/enums/CypressFields';
import * as S from './ProductToolbar.styled';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface IProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  category: string;
  onCategoryChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

const SEARCH_DEBOUNCE_MS = 300;

const ProductToolbar = ({
  searchTerm,
  onSearchChange,
  categories,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}: IProps) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const handle = setTimeout(() => onSearchChange(localSearch), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  return (
    <S.Toolbar>
      <S.SearchInput
        type="search"
        placeholder="Search products…"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        data-cy={CypressFields.ProductSearchInput}
        aria-label="Search products"
      />
      <S.Filters>
        <Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          data-cy={CypressFields.ProductCategoryFilter}
          aria-label="Filter by category"
          style={{ width: '180px' }}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          data-cy={CypressFields.ProductSortSelect}
          aria-label="Sort products"
          style={{ width: '180px' }}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </Select>
      </S.Filters>
    </S.Toolbar>
  );
};

export default ProductToolbar;
