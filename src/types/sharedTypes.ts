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
  bookAvailability: string;
  rent_amount: number;
  categoryId: number;
  image: File;
  file: File;
  description: string;
};
