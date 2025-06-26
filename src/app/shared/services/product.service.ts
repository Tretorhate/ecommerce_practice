import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductItem } from '../models/product-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  getProducts({ category, searchTerm }: { category?: string; searchTerm?: string } = {}): Observable<ProductItem[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (searchTerm) params = params.set('searchTerm', searchTerm);
    return this.http.get<ProductItem[]>('/products', { params });
  }

  getProduct(id: string): Observable<ProductItem> {
    return this.http.get<ProductItem>(`/products/by-id/${id}`);
  }
}
