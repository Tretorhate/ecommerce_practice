import { OrderItem } from './order-item.model';

export interface Order {
  id: string;
  createdAt: string;
  status: 'PENDING' | 'PAYED';
  total: number;
  items: OrderItem[];
}