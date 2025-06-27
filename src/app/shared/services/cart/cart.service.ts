import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { OrderItem } from '../../models/order-item.model';
import { ProductItem } from '../../models/product-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<OrderItem[]>(this.loadCart());

  constructor(private http: HttpClient) {}

  get cart$(): Observable<OrderItem[]> {
    return this.cartSubject.asObservable();
  }

  loadCart(): OrderItem[] {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }

  saveCart(cart: OrderItem[]): void {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartSubject.next(cart);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  addItem(item: OrderItem): Observable<OrderItem> {
    const cart = this.loadCart();
    const existing = cart.find((i) => i.productId === item.productId);
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
      throw new Error('Item not found');
    }
  }

  clearCart(): Observable<void> {
    localStorage.removeItem('cart');
    this.cartSubject.next([]);
    return of(void 0);
  }

  // Utility method to create cart item from product
  createCartItemFromProduct(
    product: ProductItem,
    quantity: number = 1
  ): OrderItem {
    // Generate a unique cart item ID
    const cartItemId = `${product.id}_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    return {
      id: cartItemId,
      productId: product.id,
      quantity: quantity,
      price: product.price,
      total: product.price * quantity,
      product: {
        id: product.id,
        title: product.title,
        category: product.category?.title,
        images: product.images || [],
      },
      storeId: product.storeId,
    };
  }

  // Get cart total
  getCartTotal(cart: OrderItem[]): number {
    return cart.reduce((total, item) => total + item.total, 0);
  }

  // Get cart item count
  getCartItemCount(cart: OrderItem[]): number {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Sync cart with NgRx store (called when store is updated)
  syncWithStore(items: OrderItem[]): void {
    this.saveCart(items);
  }
}
