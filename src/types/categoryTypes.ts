export type Category = {
  id?: number;
  category_name: string;
  createdAt: string;
};
export type CategoryStateType = {
  category: Category;
  categories: Category[];
  loading: boolean;
  error: string | null;
};
