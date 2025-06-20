import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrdersActions from '../actions/orders.actions';
import * as CartActions from '../actions/cart.actions';
import { OrderService } from '../../shared/services/order.service';
import { ProfileService } from '../../shared/services/profile/profile.service';
import { Router } from '@angular/router';
import { CreateOrderRequest } from '../../shared/models/order.model';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private profileService = inject(ProfileService);

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      mergeMap(({ order }) => {
        const orderRequest: CreateOrderRequest = {
          items: order.items.map((item) => ({
            productId: item.productId,
            storeId: item.storeId,
            quantity: item.quantity,
            price: item.price,
          })),
        };

        return this.orderService.createOrder(orderRequest).pipe(
          mergeMap((createdOrder) => [
            OrdersActions.createOrderSuccess({ order: createdOrder }),
            CartActions.clearCart(),
          ]),
          catchError((error) => of(OrdersActions.createOrderFailure({ error })))
        );
      })
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(() =>
        this.profileService.getProfile().pipe(
          map((profile) => profile.orders || []),
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError((error) => of(OrdersActions.loadOrdersFailure({ error })))
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

        return this.profileService.getProfile().pipe(
          map((profile) => {
            const order = profile.orders?.find((o) => o.id === orderId);
            if (order) {
              return order;
            }
            throw new Error('Order not found');
          }),
          map((order) => OrdersActions.loadOrderSuccess({ order })),
          catchError((error) =>
            of(
              OrdersActions.loadOrderFailure({
                error: {
                  status: 404,
                  statusText: error.message || 'Order not found',
                },
              })
            )
          )
        );
      })
    )
  );

  orderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.createOrderSuccess),
        tap(({ order }) => {
          // Show success message
          alert(`Заказ успешно оформлен! Номер заказа: ${order.id}`);

          // Navigate to order confirmation or profile
          this.router.navigate(['/profile']);

          // Store order ID for reference
          localStorage.setItem('lastOrderId', order.id);
        })
      ),
    { dispatch: false }
  );
}
