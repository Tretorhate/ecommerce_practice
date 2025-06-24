import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CategoryMenuComponent,
    CartSidebarComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  products: any[] = [];
  cart: { productId: string; storeId: string }[] = [];
  searchQuery: string = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSearch() {
    if (this.searchQuery.length) {
      this.router.navigate([`/products`], {
        queryParams: { searchTerm: this.searchQuery },
      });
    } else {
      this.router.navigate([`/products`]);
    }
  }
  onLogout() {
    this.authService.logout();
  }
  isLoggedIn = signal(false);
  ngOnInit() {
    const isLoggedIn$ = this.authService.isLoggedIn();
    isLoggedIn$.subscribe((value) => this.isLoggedIn.set(value));
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.loadProducts();
    });
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    this.cart = cart ? JSON.parse(cart) : [];
  }

  loadProducts() {
    if (this.cart.length > 0) {
      const productIds = this.cart
        .map((item) => item.productId)
        .filter((id) => id);

      this.cartService.getProductsByIds(productIds).subscribe((products) => {
        this.cartService.getStores().subscribe((stores) => {
          this.products = this.cart.map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.productId);
            const store = stores.find((s) => s.id === cartItem.storeId);
            return {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.images[0],
              quantity: 1,
              storeId: cartItem.storeId,
              storeTitle: store ? store.title : cartItem.storeId,
            };
          });
        });
      });
    }
  }
}
