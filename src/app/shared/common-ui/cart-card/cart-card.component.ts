import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-card.component.html'
})
export class CartCardComponent {
  @Input() product!: { name: string; price: number; image: string };
  quantity = 1;

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }
  
}
