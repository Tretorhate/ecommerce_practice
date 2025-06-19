import { createAction, props } from '@ngrx/store';
import { Order } from '../../shared/models/order.model';
import { Error } from '../../shared/models/error.model';

// Create Order
export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ order: Order }>()
);

export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order }>()
);

export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: Error }>()
);

// Load Orders
export const loadOrders = createAction('[Orders] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: Error }>()
);

// Load Single Order
export const loadOrder = createAction(
  '[Orders] Load Order',
  props<{ orderId: string }>()
);

export const loadOrderSuccess = createAction(
  '[Orders] Load Order Success',
  props<{ order: Order }>()
);

export const loadOrderFailure = createAction(
  '[Orders] Load Order Failure',
  props<{ error: Error }>()
);
