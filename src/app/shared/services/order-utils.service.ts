import { Injectable } from '@angular/core';
import { OrderItem } from '../models/order-item.model';
import {
  CreateOrderRequest,
  CreateOrderItemRequest,
  Order,
} from '../models/order.model';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class OrderUtilsService {
  convertCartToOrderRequest(cartItems: OrderItem[]): CreateOrderRequest {
    return {
      items: cartItems.map((item) => this.convertCartItemToOrderItem(item)),
    };
  }

  convertCartItemToOrderItem(cartItem: OrderItem): CreateOrderItemRequest {
    return {
      productId: cartItem.productId,
      storeId: cartItem.storeId,
      quantity: cartItem.quantity,
      price: cartItem.price,
    };
  }

  calculateOrderTotal(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.total, 0);
  }

  validateOrderItems(items: OrderItem[]): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!items || items.length === 0) {
      errors.push('Order must contain at least one item');
    }

    items.forEach((item, index) => {
      if (!item.productId) {
        errors.push(`Item ${index + 1}: Product ID is required`);
      }
      if (!item.storeId) {
        errors.push(`Item ${index + 1}: Store ID is required`);
      }
      if (item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Quantity must be greater than 0`);
      }
      if (item.price <= 0) {
        errors.push(`Item ${index + 1}: Price must be greater than 0`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getOrderStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      PENDING: 'Pending',
      PAYED: 'Paid',
      CANCELLED: 'Cancelled',
      SHIPPED: 'Shipped',
      DELIVERED: 'Delivered',
    };
    return statusMap[status] || status;
  }

  getOrderStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      PENDING: 'warning',
      PAYED: 'success',
      CANCELLED: 'danger',
      SHIPPED: 'info',
      DELIVERED: 'success',
    };
    return colorMap[status] || 'secondary';
  }

  getOrdersFromProfile(profile: Profile): Order[] {
    return profile.orders || [];
  }

  findOrderInProfile(profile: Profile, orderId: string): Order | undefined {
    return profile.orders?.find((order) => order.id === orderId);
  }

  getRecentOrders(profile: Profile, count: number = 5): Order[] {
    const orders = this.getOrdersFromProfile(profile);
    return orders
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, count);
  }

  getOrdersByStatus(profile: Profile, status: Order['status']): Order[] {
    return this.getOrdersFromProfile(profile).filter(
      (order) => order.status === status
    );
  }

  getTotalSpent(profile: Profile): number {
    return this.getOrdersFromProfile(profile).reduce(
      (total, order) => total + order.total,
      0
    );
  }

  hasOrders(profile: Profile): boolean {
    return (profile.orders?.length || 0) > 0;
  }
}
