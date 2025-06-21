import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';
import { OrderItem } from '../../models/order-item.model';
import * as CartSelectors from '../../../store/selectors/cart.selectors';
import { CartSidebarService } from '../../services/cart-sidebar.service';
import * as CartSelectors from '../../../store/selectors/cart.selectors';
import { CartSidebarService } from '../../services/cart-sidebar.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    CategoryMenuComponent,
    CartSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CategoryMenuComponent,
    CartSidebarComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  cartItems$: Observable<OrderItem[]>;
  cartItemCount$: Observable<number>;
  cartTotal$: Observable<number>;
  cartItems$: Observable<OrderItem[]>;
  cartItemCount$: Observable<number>;
  cartTotal$: Observable<number>;
  products: any[] = [];

  constructor(
    private store: Store,
    private cartSidebarService: CartSidebarService
  ) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartItemCount);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
  }
  constructor(
    private store: Store,
    private cartSidebarService: CartSidebarService
  ) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartItemCount);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
  }

  ngOnInit() {
    this.cartItems$.subscribe((cartItems: OrderItem[]) => {
      this.loadProducts(cartItems);
    });
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    this.cart = cart ? JSON.parse(cart) : [];
  }

  loadProducts(cartItems: OrderItem[]) {
    if (cartItems.length > 0) {
      this.products = cartItems.map((orderItem) => ({
  loadProducts(cartItems: OrderItem[]) {
    if (cartItems.length > 0) {
      this.products = cartItems.map((orderItem) => ({
        id: orderItem.product?.id || orderItem.id,
        title: orderItem.product?.title || '',
        price: orderItem.price,
        images: orderItem.product?.images || [],
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
    // This method is called by cart sidebar when cart is updated
    // The store will automatically update the observables
  }

  openCartSidebar() {
    this.cartSidebarService.openSidebar();
  }
}
