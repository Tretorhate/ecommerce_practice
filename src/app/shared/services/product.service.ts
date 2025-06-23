import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductItem } from '../models/product-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  getProducts(category?: string): Observable<ProductItem[]> {
    let url = '/products';
    if (category) {
      url += `?category=${category}`;
    }
    return this.http.get<ProductItem[]>(url);
  }

  searchProducts(searchTerm: string): Observable<ProductItem[]> {
    const url = `/products?searchTerm=${encodeURIComponent(searchTerm)}`;

    return this.http.get<ProductItem[]>(url);
  }

  getProduct(id: string): Observable<ProductItem> {
    return this.http.get<ProductItem>(`/products/by-id/${id}`);
  }
}
