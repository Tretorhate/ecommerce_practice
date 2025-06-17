import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrdersActions from '../actions/orders.actions';
import * as CartActions from '../actions/cart.actions';
// import { OrderService } from '../../shared/services/order.service';
import { Router } from '@angular/router';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  // TODO: Implement OrderService and uncomment the following effects
  /*
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      mergeMap(({ order }) =>
        this.orderService.createOrder(order).pipe(
          mergeMap((createdOrder) => [
            OrdersActions.createOrderSuccess({ order: createdOrder }),
            CartActions.clearCart(),
          ]),
          catchError((error) =>
            of(
              OrdersActions.createOrderFailure({ error })
            )
          )
        )
      )
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError((error) =>
            of(
              OrdersActions.loadOrdersFailure({ error })
            )
          )
        )
      )
    )
  );

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
            )
          )
        );
      })
    )
  );
  */

  orderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.createOrderSuccess),
        tap(({ order }) => {
          this.router.navigate(['/orders', order.id]);
          localStorage.setItem('lastOrderId', order.id);
        })
      ),
    { dispatch: false }
  );
}
