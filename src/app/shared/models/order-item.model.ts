export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  total: number;
  product: {
    title: string;
    category?: string;
  };
}