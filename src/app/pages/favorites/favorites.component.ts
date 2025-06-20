import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductItem } from '../../shared/models/product-item.model';
import { Review } from '../../shared/models/review.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent {
  favorites: ProductItem[] = [];

  removeFromFavorites(id: string): void {
    this.favorites = this.favorites.filter((item) => item.id !== id);
  }

  getAverageRating(reviews: Review[]): number {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }
}
