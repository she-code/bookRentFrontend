export type Book = {
  id?: number;
  book_title: string;
  author: string;
  quantity: number;
  description?: string;
  createdAt?: string;
  copies?: BookCopy[];
  categoryId?: number;
  Category?: {
    category_name: string;
    id: number;
  };
  image?: string;
  priceRange?: string;
  multipleCopies?: boolean;
};
export type BookStateType = {
  loading: boolean;
  books: BookCopy[];
  error: null | string;
  book: Book | null;
  book_title: string;
  author: string;
  description: string;
  rentalPrice: number;
  condition: string;

  quantity: number;
  approvedBooks: Book[];
  requestedBooks: BookCopy[];
  status: string;
  availability?: string;
  categoryId?: number;
  ownerBooks: BookCopy[];
  approvedCopies: BookCopy[];
  bookCopy: BookCopy | null;
};

export type BookCopy = {
  id?: number;
  ownerId?: number;
  bookId?: number;
  quantity: number;
  condition?: string;
  approved?: boolean;
  rejected?: boolean;
  image?: string;
  file?: string;
  rentalPrice?: number;
  createdAt?: string;
  availability?: string;
  owner?: {
    location: string;
    firstName: string;
    lastName: string;
  };
  book?: Book;
};
