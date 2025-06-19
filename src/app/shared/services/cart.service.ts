import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://practiceapi.mooo.com';
  private cartSubject = new BehaviorSubject<OrderItem[]>(this.loadCart());
  constructor(private http: HttpClient) {}

  get cart$(): Observable<OrderItem[]> {
    return this.cartSubject.asObservable();
  }

  loadCart(): OrderItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: OrderItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addItem(item: OrderItem): Observable<OrderItem> {
    const cart = this.loadCart();
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
      existing.total = existing.quantity * existing.price;
    } else {
      cart.push({ ...item, total: item.price * item.quantity });
    }
    this.saveCart(cart);
    return of(item);
  }

  removeItem(itemId: string): Observable<string> {
    let cart = this.loadCart();
    cart = cart.filter((item) => item.id !== itemId);
    this.saveCart(cart);
    return of(itemId);
  }

  updateItemQuantity(itemId: string, quantity: number): Observable<OrderItem> {
    const cart = this.loadCart();
    const item = cart.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.saveCart(cart);
      return of(item);
    } else {
      // If item not found, return error observable (could be improved)
      throw new Error('Item not found');
    }
  }

  clearCart(): Observable<void> {
    localStorage.removeItem('cart');
    this.cartSubject.next([]);
    return of(void 0);
  }
}
