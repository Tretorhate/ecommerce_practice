// import { inject, Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap, tap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import * as CartActions from '../actions/cart.actions';
// import { Router } from '@angular/router';
// import { CartService } from '../../shared/services/cart/cart.service';
//
// @Injectable()
// export class CartEffects {
//   private actions$ = inject(Actions);
//   private cartService = inject(CartService);
//   private router = inject(Router);
//
//   addToCart$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CartActions.addToCart),
//       mergeMap(({ item }) =>
//         this.cartService.addToCart(item).pipe(
//           mergeMap((updatedItem) => [
//             CartActions.addToCartSuccess({ item: updatedItem }),
//             // showNotification({ message: 'Item added to cart', type: 'success' })
//           ]),
//           catchError((error) =>
//             of(
//               CartActions.addToCartFailure({ error }),
//               // showNotification({ message: 'Failed to add item', type: 'error' })
//             ),
//           ),
//         ),
//       ),
//     ),
//   );
//
//   removeFromCart$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CartActions.removeFromCart),
//       mergeMap(({ itemId }) =>
//         this.cartService.removeFromCart(itemId).pipe(
//           mergeMap(() => [
//             CartActions.removeFromCartSuccess({ itemId }),
//             // showNotification({ message: 'Item removed from cart', type: 'success' })
//           ]),
//           catchError((error) =>
//             of(
//               CartActions.removeFromCartFailure({ error }),
//               // showNotification({ message: 'Failed to remove item', type: 'error' })
//             ),
//           ),
//         ),
//       ),
//     ),
//   );
//
//   updateCartItemQuantity$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CartActions.updateCartItemQuantity),
//       mergeMap(({ itemId, quantity }) => {
//         if (quantity < 1) {
//           return of(
//             CartActions.updateCartItemQuantityFailure({
//               error: {
//                 status: 400,
//                 statusText: 'Quantity must be greater than 0',
//               },
//             }),
//           );
//         }
//         return this.cartService.updateItemQuantity(itemId, quantity).pipe(
//           mergeMap(() => [
//             CartActions.updateCartItemQuantitySuccess({ itemId, quantity }),
//             // showNotification({ message: 'Cart updated', type: 'success' })
//           ]),
//           catchError((error) =>
//             of(
//               CartActions.updateCartItemQuantityFailure({ error }),
//               // showNotification({ message: 'Failed to update cart', type: 'error' })
//             ),
//           ),
//         );
//       }),
//     ),
//   );
//
//   clearCart$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CartActions.clearCart),
//       mergeMap(() =>
//         this.cartService.clearCart().pipe(
//           mergeMap(() => [
//             CartActions.clearCartSuccess(),
//             // showNotification({ message: 'Cart cleared', type: 'success' })
//           ]),
//           catchError((error) =>
//             of(
//               CartActions.clearCartFailure({ error }),
//               // showNotification({ message: 'Failed to clear cart', type: 'error' })
//             ),
//           ),
//         ),
//       ),
//     ),
//   );
//
//   navigateOnAdd$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(CartActions.addToCartSuccess),
//         tap(() => this.router.navigate(['/cart'])),
//       ),
//     { dispatch: false },
//   );
// }
