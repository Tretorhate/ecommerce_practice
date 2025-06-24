import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderItem } from '../../shared/models/order-item.model';
import * as CartSelectors from '../../store/selectors/cart.selectors';
import * as CartActions from '../../store/actions/cart.actions';
import { CartCardComponent } from '../../shared/components/cart-card/cart-card.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CartCardComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems$: Observable<OrderItem[]>;
  cartTotal$: Observable<number>;
  cartItemCount$: Observable<number>;
  isCartEmpty$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartItemCount);
    this.isCartEmpty$ = this.store.select(CartSelectors.selectIsCartEmpty);
    this.loading$ = this.store.select(CartSelectors.selectCartLoading);
  }

  ngOnInit(): void {}

  updateQuantity(itemId: string, quantity: number) {
    this.store.dispatch(
      CartActions.updateCartItemQuantity({ itemId, quantity })
    );
  }

  removeItem(params: { productId: string; storeId: string }) {
    this.store.dispatch(
      CartActions.removeFromCart({ itemId: params.productId })
    );
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  checkout() {
    // Navigate to checkout page
    this.router.navigate(['/checkout']);
  }
}
