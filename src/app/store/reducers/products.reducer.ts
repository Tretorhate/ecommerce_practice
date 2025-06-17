import { createReducer, on } from '@ngrx/store';
import { ProductsState } from '../state/products.state';
import * as ProductsActions from '../actions/products.actions';

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,
  // Load products
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load one product
  on(ProductsActions.loadProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductSuccess, (state, { product }) => ({
    ...state,
    // Add or update single product in the products array
    products: state.products.some((p) => p.id === product.id)
      ? state.products.map((p) => (p.id === product.id ? product : p))
      : [...state.products, product],
    loading: false,
    error: null,
  })),
  on(ProductsActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
