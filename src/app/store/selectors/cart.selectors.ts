import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../state/cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state) => state.loading
);

export const selectCartError = createSelector(
  selectCartState,
  (state) => state.error
);

export const selectCartItemCount = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.total, 0)
);

export const selectCartItemById = (itemId: string) =>
  createSelector(selectCartItems, (items) =>
    items.find((item) => item.id === itemId)
  );

export const selectIsCartEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.length
);
