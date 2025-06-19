import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://practiceapi.mooo.com';
  private cartSubject = new BehaviorSubject<{ productId: string; storeId: string }[]>(this.loadCart()); 
  
  constructor(private http: HttpClient) {}

  get cart$(): Observable<{ productId: string; storeId: string }[]> {
    return this.cartSubject.asObservable();
  }

  getStores(): Observable<{ id: string; title: string }[]> {
    return this.http.get<{ id: string; title: string }[]>(`${this.apiUrl}/stores`);
  }

  loadCart(): { productId: string; storeId: string }[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  getProductsByIds(ids: string[]): Observable<any[]> {
    const requests = ids.map((id) =>
      this.http.get<any>(`${this.apiUrl}/products/by-id/${id}`)
    );
    return forkJoin(requests); 
  }
  removeFromCart(productId: string, storeId: string): void {
    const cart = this.loadCart();
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.storeId === storeId)
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartSubject.next(updatedCart);
    console.log(`Product with ID ${productId} removed from store ${storeId}.`);
  }


  addToCart(productId: string, storeId: string): void {
    const cart = this.loadCart();
    const cartItem = { productId, storeId };
    if (!cart.some((item) => item.productId === productId && item.storeId === storeId)) {
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartSubject.next(cart);
    } else {
      console.log(`Product with ID ${productId} is already in the cart from store ${storeId}.`);
    }
  }
}


