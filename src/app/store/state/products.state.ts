import { Product } from '../../shared/types';
import { Error } from '../../shared/models/error.model';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: Error | null;
}
