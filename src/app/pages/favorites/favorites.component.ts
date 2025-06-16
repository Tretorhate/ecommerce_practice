import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../shared/services/favorites service/favorites.service';

interface FavoriteItemView {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  imageUrl: string;
  categoryTitle?: string;
  rating?: number;
  reviewsCount?: number;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteItemView[] = [];
  loading = false;
  errorMessage: string | null = null;

  private apiBase = 'https://practiceapi.mooo.com';

  constructor(private favService: FavoritesService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.favService.setAuthToken(token);
    this.loadFavorites();
  }

  private loadFavorites(): void {
    this.loading = true;
    this.favService.getFavorites().subscribe({
      next: items => {
        this.favorites = items.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          imageUrl: item.images?.[0]?.startsWith('http')
            ? item.images[0]
            : this.apiBase + item.images?.[0],
          categoryTitle: item.category?.title,
          rating: item.rating || 0,
          reviewsCount: item.reviewsCount || 0
        }));
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Не удалось загрузить избранное.';
        this.favorites = [];
        this.loading = false;
      }
    });
  }

  removeFromFavorites(id: string): void {
    this.favorites = this.favorites.filter(item => item.id !== id);
  }
}
