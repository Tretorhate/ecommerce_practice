import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrdersActions from '../actions/orders.actions';
import * as CartActions from '../actions/cart.actions';
import { OrderService } from '../../shared/services/order.service';
import { Router } from '@angular/router';

@Injectable()
export class OrdersEffects {
  // Create order with multiple side effects
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      mergeMap(({ order }) =>
        this.orderService.createOrder(order).pipe(
          mergeMap((createdOrder) => [
            OrdersActions.createOrderSuccess({ order: createdOrder }),
            CartActions.clearCart(), // Clear cart after successful order
            // showNotification({ message: 'Order placed successfully!', type: 'success' })
          ]),
          catchError((error) =>
            of(
              OrdersActions.createOrderFailure({ error })
              // showNotification({ message: 'Failed to place order', type: 'error' })
            )
          )
        )
      )
    )
  );

  // Navigate to order confirmation after successful order
  orderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.createOrderSuccess),
        tap(({ order }) => {
          this.router.navigate(['/orders', order.id]);
          // Could also store order ID in localStorage for reference
          localStorage.setItem('lastOrderId', order.id);
        })
      ),
    { dispatch: false }
  );

  // Load orders with pagination
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError((error) =>
            of(
              OrdersActions.loadOrdersFailure({ error })
              // showNotification({ message: 'Failed to load orders', type: 'error' })
            )
          )
        )
      )
    )
  );

  // Load single order with validation
  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrder),
      mergeMap(({ orderId }) => {
        if (!orderId) {
          return of(
            OrdersActions.loadOrderFailure({
              error: { status: 400, statusText: 'Order ID is required' },
            })
          );
        }
        return this.orderService.getOrder(orderId).pipe(
          map((order) => OrdersActions.loadOrderSuccess({ order })),
          catchError((error) =>
            of(
              OrdersActions.loadOrderFailure({ error })
              // showNotification({ message: 'Failed to load order details', type: 'error' })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private router: Router
  ) {}
}
