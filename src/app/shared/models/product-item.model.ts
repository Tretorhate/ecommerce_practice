import { Review } from './review.model';

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  storeId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  category: {
    id: string;
    parentId: string | null;
    title: string;
    description: string;
  };
  reviews: Review[];
  store: {
    id: string;
    title: string;
    description: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };

  isFavorite?: boolean;
}
