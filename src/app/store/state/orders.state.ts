import { Order } from '../../shared/models/order.model';
import { Error } from '../../shared/models/error.model';

export interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: Error | null;
}
