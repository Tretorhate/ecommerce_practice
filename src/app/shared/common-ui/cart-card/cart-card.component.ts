import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-card.component.html'
})
export class CartCardComponent {
  @Input() product!: { name: string; price: number; image: string; quantity: number };
  @Output() quantityChange = new EventEmitter<number>();
  @Output() removeProduct = new EventEmitter<void>();

  get totalPrice(): number {
    return this.product.price * this.product.quantity;
  }

  increment() {
    this.product.quantity++;
    this.quantityChange.emit(this.product.quantity);
  }

  decrement() {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      this.quantityChange.emit(this.product.quantity);
    } else {
      this.removeProduct.emit(); // Уведомляем родителя о необходимости удаления продукта
    }
  }
}