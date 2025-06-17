import { createReducer, on } from '@ngrx/store';
import { OrdersState } from '../state/orders.state';
import * as OrdersActions from '../actions/orders.actions';

export const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const ordersReducer = createReducer(
  initialState,
  // Create order
  on(OrdersActions.createOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    orders: [...state.orders, order],
    loading: false,
    error: null,
  })),
  on(OrdersActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load orders
  on(OrdersActions.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
    error: null,
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load one order
  on(OrdersActions.loadOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersActions.loadOrderSuccess, (state, { order }) => ({
    ...state,
    // Add or update one order in the orders array
    orders: state.orders.some((o) => o.id === order.id)
      ? state.orders.map((o) => (o.id === order.id ? order : o))
      : [...state.orders, order],
    loading: false,
    error: null,
  })),
  on(OrdersActions.loadOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
