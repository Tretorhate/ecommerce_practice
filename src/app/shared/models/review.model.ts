export interface Review {
  id: string;
  createdAt: string;
  text: string;
  rating: number;
  productId: string;
  userId: string;
  storeId: string;
  product?: {
    id: string;
    title: string;
    images?: string[];
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  store: {
    id: string;
    title: string;
  };
}
