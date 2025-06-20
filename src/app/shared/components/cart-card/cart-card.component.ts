import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-card',
  imports: [CommonModule],
  templateUrl: './cart-card.component.html',
})
export class CartCardComponent {
  @Input() product!: {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: 1;
    storeId: string;
    storeTitle: string;
  };
  @Input() storeTitle!: string;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() removeProduct = new EventEmitter<{
    productId: string;
    storeId: string;
  }>();

  get totalPrice(): number {
    return this.product.price * this.product.quantity;
  }

  get productImage(): string {
    const imageUrl = this.product.images?.[0] || '';
    if (!imageUrl) return '';

    // If the image URL is already absolute, return it as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    // If it's a relative path, add the base URL
    return `https://practiceapi.mooo.com${imageUrl}`;
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
      this.removeProduct.emit(this.product.id);
    }
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
}
