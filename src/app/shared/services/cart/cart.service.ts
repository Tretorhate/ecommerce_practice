import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { OrderItem } from '../../models/order-item.model';
import { ProductItem } from '../../models/product-item.model';
import * as CartActions from '../../../store/actions/cart.actions';
import { selectCartItems } from '../../../store/selectors/cart.selectors';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<OrderItem[]>(this.loadCart());

  constructor(private http: HttpClient, private store: Store) {}

  get cart$(): Observable<OrderItem[]> {
    return this.cartSubject.asObservable();
  }

  loadCart(): OrderItem[] {
    try {
      const cart = localStorage.getItem('cart');
      const items = cart ? JSON.parse(cart) : [];

      const migratedItems = items.map((item: OrderItem) => {
        if (!item.storeTitle) {
          return {
            ...item,
            storeTitle: 'Неизвестный магазин',
          };
        }
        return item;
      });

      return migratedItems;
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

  syncWithStore(items: OrderItem[]): void {
    this.saveCart(items);
  }
  addProductToCart(product: ProductItem, quantity: number = 1): void {
    const cartItem = this.createCartItemFromProduct(product, quantity);
    this.store.dispatch(CartActions.addToCart({ item: cartItem }));
  }

  incrementCartItemQuantity(itemId: string): void {
    // Get current quantity from store state, not localStorage
    this.store
      .select(selectCartItems)
      .pipe(take(1))
      .subscribe((items) => {
        const item = items.find((i) => i.id === itemId);
        if (item) {
          this.store.dispatch(
            CartActions.updateCartItemQuantity({
              itemId,
              quantity: item.quantity + 1,
            })
          );
        }
      });
  }

  decrementCartItemQuantity(itemId: string): void {
    // Get current quantity from store state, not localStorage
    this.store
      .select(selectCartItems)
      .pipe(take(1))
      .subscribe((items) => {
        const item = items.find((i) => i.id === itemId);
        if (item) {
          if (item.quantity > 1) {
            this.store.dispatch(
              CartActions.updateCartItemQuantity({
                itemId,
                quantity: item.quantity - 1,
              })
            );
          } else {
            this.store.dispatch(CartActions.removeFromCart({ itemId }));
          }
        }
      });
  }

  removeCartItem(itemId: string): void {
    this.store.dispatch(CartActions.removeFromCart({ itemId }));
  }

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
      storeTitle: product.store?.title || 'Неизвестный магазин',
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
}
