import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { OrderService } from '../../services/cart/order.service';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CartCardComponent, CommonModule],
  templateUrl: './cart-sidebar.component.html',
})
export class CartSidebarComponent {
  @Input() products: any[] = [];
  @Output() cartUpdated = new EventEmitter<void>();
  isOpen = false;

  constructor(private orderService: OrderService) {}

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  getTotalQuantity(): number {
    return this.products.reduce(
      (total, product) => total + (product.quantity || 1),
      0,
    );
  }

  getTotalPrice(): number {
    return this.products.reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0,
    );
  }

  removeProduct(productId: string, storeId: string) {
    this.products = this.products.filter(
      (product) => !(product.id === productId && product.storeId === storeId),
    );
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(
      (item: { productId: string; storeId: string }) =>
        !(item.productId === productId && item.storeId === storeId),
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartUpdated.emit();
  }

  updateTotal() {}

  order() {
    const items = this.products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      storeId: product.storeId,
      price: product.price,
    }));

    this.orderService.createOrder(items).subscribe(
      () => alert('Заказ успешно оформлен!'),
      () => alert('Ошибка при оформлении заказа.'),
    );
  }
}

