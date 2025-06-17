import { OrderItem } from '../../shared/models/order-item.model';
import { Error } from '../../shared/models/error.model';

export interface CartState {
  items: OrderItem[];
  loading: boolean;
  error: Error | null;
}
