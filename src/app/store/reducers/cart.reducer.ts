import { createReducer, on } from '@ngrx/store';
import { CartState } from '../state/cart.state';
import * as CartActions from '../actions/cart.actions';

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
  // Add item to cart
  on(CartActions.addToCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.addToCartSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    loading: false,
    error: null,
  })),
  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Remove item from cart
  on(CartActions.removeFromCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.removeFromCartSuccess, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== itemId),
    loading: false,
    error: null,
  })),
  on(CartActions.removeFromCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update item quantity in cart
  on(CartActions.updateCartItemQuantity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    CartActions.updateCartItemQuantitySuccess,
    (state, { itemId, quantity }) => ({
      ...state,
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
      loading: false,
      error: null,
    })
  ),
  on(CartActions.updateCartItemQuantityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear cart
  on(CartActions.clearCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.clearCartSuccess, () => ({
    ...initialState,
  })),
  on(CartActions.clearCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
