import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../../models/product-item.model';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../../shared/services/favorites/favorites.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductItem;
  stars = Array.from({ length: 5 });
  isFav: boolean = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.isFav = this.product.isFavorite ?? false;
  }

  get rating(): number {
    if (!this.product.reviews || this.product.reviews.length === 0) return 0;
    const total = this.product.reviews.reduce((sum, r) => sum + r.rating, 0);
    return Math.round(total / this.product.reviews.length);
  }

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.product.id).subscribe({
      next: () => {
        this.isFav = !this.isFav;
      },
      error: (error: any) => {
        console.error('Ошибка избранного:', error);
      },
    });
  }
}
