export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  total: number;
  product?: {
    id: string,
    title: string;
    category?: string;
  };
  storeId:string
}