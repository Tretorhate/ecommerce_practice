import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = 'https://practiceapi.mooo.com/orders';

  constructor(private http: HttpClient) {}

  createOrder(items: { productId: string; storeId: string; quantity: number; price: number }[]): Observable<any> {
    const token = localStorage.getItem('accessToken'); 
    if (!token) {
      throw new Error('Токен авторизации отсутствует. Пользователь не авторизован.');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*', 
      Authorization: `Bearer ${token}`, 
    });
    const body = { items }; 
    console.log('Request body:', body); 
    return this.http.post(this.apiUrl, body, { headers });
  }
}