import { ProductItem } from './product-item.model';

export interface Review {
  id: string;
  createdAt: Date;
  text: string;
  rating: number;
  product: ProductItem;
  user: {
    name: string;
  };
  store: {
    title: string;
  };
}
