export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
  product?: {
    id: string;
    title: string;
    category?: string;
    images?: string[];
  };
  storeId: string;
}
