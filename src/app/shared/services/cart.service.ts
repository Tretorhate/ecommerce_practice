import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://practiceapi.mooo.com';

  constructor(private http: HttpClient) {}

  getProductsByIds(ids: string[]): Observable<any> {
    const idsParam = ids.join(',');
    return this.http.get<any>(`${this.apiUrl}/products/by-id/${idsParam}`);
  }
}