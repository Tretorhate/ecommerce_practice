import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProfileService } from '../profile/profile.service';
import { CreateOrderRequest, Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://practiceapi.mooo.com';

  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  createOrder(orderRequest: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, orderRequest);
  }

  getOrders(): Observable<Order[]> {
    // Fetch orders through profile endpoint
    return this.profileService
      .getProfile()
      .pipe(map((profile) => profile.orders || []));
  }

  getOrder(orderId: string): Observable<Order> {
    // First try to get from profile orders, if not found, use direct endpoint
    return this.profileService.getProfile().pipe(
      map((profile) => {
        const order = profile.orders?.find((o) => o.id === orderId);
        if (order) {
          return order;
        }
        // If not found in profile, this will throw an error and we can handle it
        throw new Error('Order not found in profile');
      })
    );
  }

  updateOrderStatus(
    orderId: string,
    status: Order['status']
  ): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/orders/${orderId}`, {
      status,
    });
  }
}
