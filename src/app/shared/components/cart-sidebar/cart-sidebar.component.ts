import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartCardComponent } from '../cart-card/cart-card.component';
import * as CartActions from '../../../store/actions/cart.actions';
import { CartSidebarService } from '../../services/cart-sidebar.service';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CartCardComponent, CommonModule, RouterModule],
  templateUrl: './cart-sidebar.component.html',
})
export class CartSidebarComponent {
  @Input() products: any[] = [];
  @Output() cartUpdated = new EventEmitter<void>();

  constructor(
    private store: Store,
    private cartSidebarService: CartSidebarService
  ) {}

  get isOpen$() {
    return this.cartSidebarService.isOpen$;
  }

  openSidebar() {
    this.cartSidebarService.openSidebar();
  }

  closeSidebar() {
    this.cartSidebarService.closeSidebar();
  }

  getTotalQuantity(): number {
    return this.products.reduce(
      (total, product) => total + (product.quantity || 1),
      0
    );
  }

  getTotalPrice(): number {
    return this.products.reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0
    );
  }

  removeProduct(productId: string) {
    this.store.dispatch(CartActions.removeFromCart({ itemId: productId }));
    this.cartUpdated.emit();
  }

  updateTotal() {
    // This will be handled by the store automatically
  }

  updateQuantity(itemId: string, quantity: number) {
    this.store.dispatch(
      CartActions.updateCartItemQuantity({ itemId, quantity })
    );
  }
}
