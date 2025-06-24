import { createAction, props } from '@ngrx/store';
import { OrderItem } from '../../shared/models/order-item.model';
import { Error } from '../../shared/models/error.model';

// Load cart from localStorage
export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: OrderItem[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: Error }>()
);

// Add item to cart
export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: OrderItem }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add Item Success',
  props<{ item: OrderItem }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add Item Failure',
  props<{ error: Error }>()
);

// Remove item from cart
export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ itemId: string }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove Item Success',
  props<{ itemId: string }>()
);

export const removeFromCartFailure = createAction(
  '[Cart] Remove Item Failure',
  props<{ error: Error }>()
);

// Update item quantity in cart
export const updateCartItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ itemId: string; quantity: number }>()
);

export const updateCartItemQuantitySuccess = createAction(
  '[Cart] Update Item Quantity Success',
  props<{ itemId: string; quantity: number }>()
);

export const updateCartItemQuantityFailure = createAction(
  '[Cart] Update Item Quantity Failure',
  props<{ error: Error }>()
);

// Clear cart
export const clearCart = createAction('[Cart] Clear Cart');
export const clearCartSuccess = createAction('[Cart] Clear Cart Success');
export const clearCartFailure = createAction(
  '[Cart] Clear Cart Failure',
  props<{ error: Error }>()
);
