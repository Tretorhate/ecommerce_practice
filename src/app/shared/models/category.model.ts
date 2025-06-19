export interface Category {
  id: string;
  parentId: string | null;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}
