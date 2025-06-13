import { Component, OnInit } from '@angular/core';
import { CategoryMenuComponent } from '../../shared/common-ui/category-menu/category-menu.component';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { CartService } from '../../shared/services/cart.service';

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
    this.loadCart();
    this.loadProducts();
  }

  // Load cart from localStorage
  loadCart() {
    const cart = localStorage.getItem('cart');
    this.cart = cart ? JSON.parse(cart) : [];
  }

  // Fetch product details from the server
  loadProducts() {
    if (this.cart.length > 0) {
      this.cartService.getProductsByIds(this.cart).subscribe(
        (product) => {
          // Transform server response into the required format
          this.products = [{
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0], // Use the first image
            quantity: 1, // Default quantity
          }];
        },
        (error) => {
          console.error('Error loading products:', error);
        }
      );
    }
  }

  // Add product to cart and update localStorage
  addToCart(productId: string) {
    if (!this.cart.includes(productId)) {
      this.cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.loadProducts(); // Refresh product list
    }
  }
}