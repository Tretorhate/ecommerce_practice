import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';

@Component({
  selector: 'app-header',
  imports: [CategoryMenuComponent, CartSidebarComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  products: any[] = [];
  cart: string[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
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
      this.cartService.getProductsByIds(this.cart).subscribe(
        (products) => {
          this.products = products.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: 1,
          }));
        },
        (error) => {
          console.error('Error loading products:', error);
        },
      );
    }
  }
}
