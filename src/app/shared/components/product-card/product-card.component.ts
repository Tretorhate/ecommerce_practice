import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../../models/product-item.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: ProductItem;

  stars = Array.from({ length: 5 });

  isFavorite = false;

  get rating(): number {
    if (!this.product.reviews || this.product.reviews.length === 0) {
      return 0;
    }
    const totalRating = this.product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return Math.round(totalRating / this.product.reviews.length);
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
