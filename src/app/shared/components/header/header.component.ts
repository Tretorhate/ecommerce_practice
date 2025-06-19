import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';

@Component({
  selector: 'app-header',
  imports: [CategoryMenuComponent, CartSidebarComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  products: any[] = [];
  cart: { productId: string; storeId: string }[] = [];

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
      const productIds = this.cart.map((item) => item.productId).filter((id) => id); 
      this.cartService.getProductsByIds(productIds).subscribe(
        (products) => {
          this.products = this.cart.map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.productId);
            return {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.images[0],
              quantity: 1,
              storeId: cartItem.storeId,
            };
          });
          console.log('Loaded products with storeId:', this.products); 
        },
        (error) => {
          console.error('Error loading products:', error);
        },
      );
    }
  }
}