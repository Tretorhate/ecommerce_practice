import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { CartService } from '../../shared/services/cart.service';
import * as CartSelectors from '../selectors/cart.selectors';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);
  private store = inject(Store);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap(() => {
        try {
          const items = this.cartService.loadCart();
          return of(CartActions.loadCartSuccess({ items }));
        } catch (error) {
          return of(
            CartActions.loadCartFailure({
              error: {
                status: 500,
                statusText: 'Failed to load cart from localStorage',
              },
            })
          );
        }
      })
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      withLatestFrom(this.store.select(CartSelectors.selectCartItems)),
      mergeMap(([{ item }, currentItems]) => {
        const existingItem = currentItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          // If item already exists, increment quantity
          const newQuantity = existingItem.quantity + item.quantity;
          return this.cartService.updateItemQuantity(item.id, newQuantity).pipe(
            mergeMap((updatedItem) => [
              CartActions.updateCartItemQuantitySuccess({
                itemId: item.id,
                quantity: newQuantity,
              }),
            ]),
            catchError((error) => of(CartActions.addToCartFailure({ error })))
          );
        } else {
          // If item doesn't exist, add it
          return this.cartService.addItem(item).pipe(
            mergeMap((updatedItem) => [
              CartActions.addToCartSuccess({ item: updatedItem }),
            ]),
            catchError((error) => of(CartActions.addToCartFailure({ error })))
          );
        }
      })
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      mergeMap(({ itemId }) =>
        this.cartService.removeItem(itemId).pipe(
          mergeMap(() => [
            CartActions.removeFromCartSuccess({ itemId }),
            // showNotification({ message: 'Item removed from cart', type: 'success' })
          ]),
          catchError((error) =>
            of(
              CartActions.removeFromCartFailure({ error })
              // showNotification({ message: 'Failed to remove item', type: 'error' })
            )
          )
        )
      )
    )
  );

  updateCartItemQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartItemQuantity),
      withLatestFrom(this.store.select(CartSelectors.selectCartItems)),
      mergeMap(([{ itemId, quantity }, currentItems]) => {
        const currentItem = currentItems.find((item) => item.id === itemId);
        if (!currentItem) {
          return of(
            CartActions.updateCartItemQuantityFailure({
              error: {
                status: 404,
                statusText: 'Item not found in cart',
              },
            })
          );
        }

        const newQuantity = currentItem.quantity + quantity;
        if (newQuantity < 1) {
          // If quantity would be less than 1, remove the item
          return this.cartService.removeItem(itemId).pipe(
            mergeMap(() => [CartActions.removeFromCartSuccess({ itemId })]),
            catchError((error) =>
              of(CartActions.removeFromCartFailure({ error }))
            )
          );
        }

        return this.cartService.updateItemQuantity(itemId, newQuantity).pipe(
          mergeMap(() => [
            CartActions.updateCartItemQuantitySuccess({
              itemId,
              quantity: newQuantity,
            }),
          ]),
          catchError((error) =>
            of(CartActions.updateCartItemQuantityFailure({ error }))
          )
        );
      })
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      mergeMap(() =>
        this.cartService.clearCart().pipe(
          mergeMap(() => [
            CartActions.clearCartSuccess(),
            // showNotification({ message: 'Cart cleared', type: 'success' })
          ]),
          catchError((error) =>
            of(
              CartActions.clearCartFailure({ error })
              // showNotification({ message: 'Failed to clear cart', type: 'error' })
            )
          )
        )
      )
    )
  );

  // Sync cart changes to localStorage
  syncCartToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addToCartSuccess,
          CartActions.removeFromCartSuccess,
          CartActions.updateCartItemQuantitySuccess,
          CartActions.clearCartSuccess
        ),
        withLatestFrom(this.store.select(CartSelectors.selectCartItems)),
        tap(([action, items]) => {
          // Sync the current store state to localStorage
          this.cartService.syncWithStore(items);
        })
      ),
    { dispatch: false }
  );
}
