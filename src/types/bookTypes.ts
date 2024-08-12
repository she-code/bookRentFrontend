export type Book = {
  id?: number;
  book_title: string;
  status?: string;
  author: string;
  quantity: number;
  description: string;
  image?: string;
  file?: string;
  rent_amount?: number;
  createdAt?: string;
  bookAvailability?: string;
  categoryId?: number;
  User?: {
    location: string;
    firstName: string;
    lastName: string;
  };
  Category?: {
    category_name: string;
    id: number;
  };
};
export type BookStateType = {
  loading: boolean;
  books: Book[];
  error: null | string;
  book: Book | null;
  book_title: string;
  author: string;
  description: string;
  rent_amount: number;
  quantity: number;
  approvedBooks: Book[];
  requestedBooks: Book[];
  status: string;
  bookAvailability?: string;
  categoryId?: number;
  ownerBooks: Book[];
};
