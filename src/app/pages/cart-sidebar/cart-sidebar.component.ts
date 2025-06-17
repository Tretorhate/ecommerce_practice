import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartCardComponent } from '../../shared/common-ui/cart-card/cart-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CartCardComponent, CommonModule],
  templateUrl: './cart-sidebar.component.html',
})
export class CartSidebarComponent {
  @Input() products: any[] = [];
  @Output() cartUpdated = new EventEmitter<void>(); 
  isOpen = false;

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

  removeProduct(productId: string) {
    this.products = this.products.filter((product) => product.id !== productId);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter((id: string) => id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    this.cartUpdated.emit();
  }

  updateTotal() {}

  // Обработчик для кнопки "Заказать"
  order() {
    alert('Заказ оформлен!');
  }
}
