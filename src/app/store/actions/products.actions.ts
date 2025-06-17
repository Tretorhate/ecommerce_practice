import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/types';
import { Error } from '../../shared/models/error.model';

// Load Products
export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ category?: string }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: Error }>()
);

// Load Single Product
export const loadProduct = createAction(
  '[Products] Load Product',
  props<{ id: string }>()
);

export const loadProductSuccess = createAction(
  '[Products] Load Product Success',
  props<{ product: Product }>()
);

export const loadProductFailure = createAction(
  '[Products] Load Product Failure',
  props<{ error: Error }>()
);
