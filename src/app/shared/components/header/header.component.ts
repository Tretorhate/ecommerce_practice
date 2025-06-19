import { Component, OnInit } from '@angular/core';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { CartSidebarComponent } from '../../../pages/cart-sidebar/cart-sidebar.component';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../models/order-item.model';

@Component({
  selector: 'app-header',
  imports: [CategoryMenuComponent, CartSidebarComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  products: any[] = [];
  cart: OrderItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((cart: OrderItem[]) => {
      this.cart = cart;
      this.loadProducts();
    });
  }

  loadProducts() {
    if (this.cart.length > 0) {
      this.products = this.cart.map((orderItem) => ({
        id: orderItem.product?.id || orderItem.id,
        title: orderItem.product?.title || '',
        price: orderItem.price,
        image: '',
        quantity: orderItem.quantity,
      }));
    } else {
      this.products = [];
    }
  }

  loadCart() {
    this.cartService.cart$.subscribe((cart: OrderItem[]) => {
      this.cart = cart;
      this.loadProducts();
    });
  }
}
