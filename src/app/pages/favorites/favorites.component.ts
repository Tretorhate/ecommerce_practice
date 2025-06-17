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
    const token = localStorage.getItem('accessToken');
    this.favService.setAuthToken(token);
    this.loadFavorites();
  }

  private loadFavorites(): void {
    this.loading = true;
    this.favService.getFavorites().subscribe({
      next: async (items) => {
        const enrichedFavorites = await Promise.all(
          items.map(async (item) => {
            let rating: number | undefined = undefined;
            let reviewsCount = 0;

            try {
              const reviews = (await this.favService.getReviews(item.id).toPromise()) || [];
              reviewsCount = reviews.length;
              rating = reviewsCount > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
                : undefined;
            } catch (e) {
              console.error('Ошибка загрузки отзывов:', e);
            }

            return {
              id: item.id,
              title: item.title,
              description: item.description,
              price: item.price,
              imageUrl: item.images?.[0]?.startsWith('http')
                ? item.images[0]
                : this.apiBase + item.images?.[0],
              categoryTitle: item.category?.title,
              rating,
              reviewsCount
            };
          })
        );

        this.favorites = enrichedFavorites;
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
    this.favService.toggleFavorite(id).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(item => item.id !== id);
      },
      error: (error) => {
        console.error('Ошибка удаления:', error);
        this.errorMessage = 'Не удалось удалить товар из избранного.';
      }
    });
  }

}
