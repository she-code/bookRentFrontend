import { Book } from "./bookTypes";
import { User } from "./userTypes";

export type Column = {
  id: keyof User | keyof Book | "actions";
  label: string;
  isSortable?: boolean;
  isAction?: boolean;
};
export type Status = {
  label: string;
  value: string;
};

export type RegisterBookParams = {
  book_title: string;
  author: string;
  quantity: number;
  availability: string;
  condition: string;

  rentalPrice: number;
  categoryId: number;
  image: File;
  file: File;
  description: string;
};

export type AddRentParams = {
  bookId: number;
  ownerId: number;
  quantity: number;
  totalAmount: number;
  bookCopyId: number;
};

export type QueryParams = {
  copyId?: string; // Optional, as not all routes may have this parameter
  [key: string]: string | undefined; // For any other potential query parameters
};
