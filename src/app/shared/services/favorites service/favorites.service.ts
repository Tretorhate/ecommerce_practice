import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  providedIn: 'root'
})
export class FavoritesService {
  private apiBase = 'https://practiceapi.mooo.com';
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  getFavorites(): Observable<ApiFavoriteItem[]> {
    const headers = this.authToken
      ? new HttpHeaders().set('Authorization', 'Bearer ' + this.authToken)
      : new HttpHeaders();

    return this.http
      .get<{ favorites: ApiFavoriteItem[] }>(`${this.apiBase}/users/profile`, { headers })
      .pipe(map(response => response.favorites || []));
  }
}
