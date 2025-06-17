import { ProductItem } from '../../shared/models/product-item.model';
import { Error } from '../../shared/models/error.model';

export interface ProductsState {
  products: ProductItem[];
  loading: boolean;
  error: Error | null;
}
