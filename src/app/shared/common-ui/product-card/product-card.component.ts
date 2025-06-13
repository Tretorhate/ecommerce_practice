import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: string;
  brand: string;
  seller: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;

  stars = Array.from({ length: 5 });

  isFavorite = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
