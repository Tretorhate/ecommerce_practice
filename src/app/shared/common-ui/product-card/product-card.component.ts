import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../../models/product-item.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: ProductItem;

  stars = Array.from({ length: 5 });

  isFavorite = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
