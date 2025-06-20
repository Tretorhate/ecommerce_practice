import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(items: { productId: string; storeId: string; quantity: number; price: number }[]): Observable<any> {
    const body = { items };
    return this.http.post('/orders', body);
  }
}