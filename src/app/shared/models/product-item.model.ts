export interface ProductItem {
  id: string;
  name?: string; // Used in product list/card
  title?: string; // Used in product info
  price: number;
  rating?: number;
  imageUrl?: string; // Used in product list/card
  image?: string; // Used in product info
  images?: string[]; // Used in product info
  thumbnailImages?: string[]; // Used in product info
  category?: string;
  brand?: string;
  seller?: string;
  installmentPrice?: number;
  installmentCount?: number;
}
