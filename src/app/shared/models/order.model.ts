import { OrderItem } from './order-item.model';

export interface Order {
  id: string;
  userId: string;
  createdAt: string;
  status: 'PENDING' | 'PAYED';
  total: number;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  items: CreateOrderItemRequest[];
}

export interface CreateOrderItemRequest {
  productId: string;
  storeId: string;
  quantity: number;
  price: number;
}
