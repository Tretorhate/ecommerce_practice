import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { OrderItem } from '../../models/order-item.model';
import * as CartSelectors from '../../../store/selectors/cart.selectors';
import { CartSidebarService } from '../../services/cart-sidebar.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    CategoryMenuComponent,
    CartSidebarComponent,
    FormsModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  cartItems$: Observable<OrderItem[]>;
  cartItemCount$: Observable<number>;
  cartTotal$: Observable<number>;
  products: any[] = [];
  isLoggedIn = signal(false);
  searchTerm: string = '';

  constructor(
    private store: Store,
    private cartSidebarService: CartSidebarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartItemCount);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
  }

  ngOnInit() {
    const isLoggedIn$ = this.authService.isLoggedIn();
    isLoggedIn$.subscribe((value) => this.isLoggedIn.set(value));

    this.cartItems$.subscribe((cartItems: OrderItem[]) => {
      this.loadProducts(cartItems);
    });
  }

  loadProducts(cartItems: OrderItem[]) {
    if (cartItems.length > 0) {
      this.products = cartItems.map((orderItem) => ({
        id: orderItem.id,
        title: orderItem.product?.title || '',
        price: orderItem.price,
        images: orderItem.product?.images || [],
        quantity: orderItem.quantity,
      }));
    } else {
      this.products = [];
    }
  }

  loadCart() {
    // This method is called by cart sidebar when cart is updated
    // The store will automatically update the observables
  }

  openCartSidebar() {
    this.cartSidebarService.openSidebar();
  }

  onLogout() {
    this.authService.logout();
  }

  onSearch(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const term = this.searchTerm.trim();
    if (!term) {
      return;
    }

    this.router.navigate(['/category'], {
      queryParams: { searchTerm: term },
      queryParamsHandling: 'merge',
    });
  }
}
