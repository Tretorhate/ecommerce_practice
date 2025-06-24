import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductItem } from '../models/product-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  getProducts({
    category,
    searchTerm,
  }: {
    category?: string;
    searchTerm?: string;
  }): Observable<ProductItem[]> {
    let url = '/products';
    // if (category) {
    //   url += `?category=${category}`;
    // }
    if (searchTerm) {
      url += `?searchTerm=${searchTerm}`;
    }
    console.log(url);
    return this.http.get<ProductItem[]>(url);
  }

  getProduct(id: string): Observable<ProductItem> {
    return this.http.get<ProductItem>(`/products/by-id/${id}`);
  }
}
