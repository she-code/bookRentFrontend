import { Book, BookCopy } from "./bookTypes";

export type Rent = {
  id?: number;
  rentedBy: number;
  bookCopyId: number;
  bookId: number;
  ownerId: number;
  quantity: number;
  totalAmount: number;
  status?: string;
  createdAt: string;
  owner?: {
    firstName: string;
    lastName: string;
  };
  renter?: {
    firstName: string;
    lastName: string;
  };
  book?: Book;
  bookCopy?: BookCopy;
};
export type RentStateType = {
  rent: Rent | null;
  rents: Rent[];
  ownerRents: Rent[];
  rentedBy: number;
  bookCopyId: number;
  bookId: number;
  ownerId: number;
  quantity: number;
  totalAmount: number;
  loading: boolean;
  error: null | string;
};
