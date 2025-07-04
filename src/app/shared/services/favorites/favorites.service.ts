import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductItem } from '../../models/product-item.model';
import * as ProductsActions from '../../../store/actions/products.actions';

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
  constructor(private http: HttpClient, private store: Store) {}

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

  checkFavoriteStatus(product: ProductItem): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // If isFavorite is already available from backend (products list), use it
      if (product.isFavorite !== undefined) {
        observer.next(product.isFavorite);
        observer.complete();
        return;
      }

      this.getFavorites()
        .pipe(take(1))
        .subscribe({
          next: (favorites) => {
            const isFavorite = favorites.some((fav) => fav.id === product.id);
            observer.next(isFavorite);
            observer.complete();
          },
          error: (err) => {
            console.error('Error checking favorite status:', err);
            observer.next(false);
            observer.complete();
          },
        });
    });
  }

  toggleFavoriteWithStoreUpdate(
    product: ProductItem,
    currentStatus: boolean
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.toggleFavorite(product.id).subscribe({
        next: () => {
          const newStatus = !currentStatus;
          const updatedProduct = { ...product, isFavorite: newStatus };
          this.store.dispatch(
            ProductsActions.loadProductSuccess({ product: updatedProduct })
          );

          observer.next(newStatus);
          observer.complete();
        },
        error: (err) => {
          console.error('Error toggling favorite:', err);
          observer.error(err);
        },
      });
    });
  }
}
