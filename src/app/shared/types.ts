export type User = {
  id: string;
  email: string;
  name: string;
  picture: string;
  stores: Store[];
  favorites: Product[];
  createdAt: string;
  updatedAt: string;
};

export type Store = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
};
