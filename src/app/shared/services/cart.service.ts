import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://practiceapi.mooo.com';
  private cartSubject = new BehaviorSubject<string[]>(this.loadCart()); 
  constructor(private http: HttpClient) {}

  get cart$(): Observable<string[]> {
    return this.cartSubject.asObservable();
  }

  loadCart(): string[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  getProductsByIds(ids: string[]): Observable<any[]> {
    const requests = ids.map((id) =>
      this.http.get<any>(`${this.apiUrl}/products/by-id/${id}`)
    );
    return forkJoin(requests); 
  }


  addToCart(productId: string): void {
    const cart = this.loadCart();
    if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartSubject.next(cart); 
      console.log(`Product with ID ${productId} added to cart.`);
    } else {
      console.log(`Product with ID ${productId} is already in the cart.`);
    }
  }
}


