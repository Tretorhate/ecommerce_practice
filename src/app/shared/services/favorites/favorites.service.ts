import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ApiFavoriteItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  images: string[];
  category?: { title?: string };
  rating?: number;
  reviewsCount?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  getFavorites(): Observable<ApiFavoriteItem[]> {
    return this.http
      .get<{
        favorites: ApiFavoriteItem[];
      }>(`/users/profile`)
      .pipe(map((response) => response.favorites || []));
  }

  getReviews(productId: string): Observable<{ rating: number }[]> {
    return this.http.get<{ rating: number }[]>(`/reviews/${productId}`);
  }

  toggleFavorite(productId: string): Observable<any> {
    return this.http.patch(`/users/profile/favorites/${productId}`, {});
  }
}
