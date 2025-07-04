import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../state/products.state';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectProductById = (productId: string) =>
  createSelector(selectProducts, (products) =>
    products.find((product) => product.id === productId)
  );
