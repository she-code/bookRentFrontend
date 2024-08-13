import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookCopy, BookStateType } from "../../types/bookTypes";

const initialState: BookStateType = {
  loading: false,
  books: [],
  error: null,
  book: {
    book_title: "",
    author: "",
    description: "",
    quantity: 0,
  },
  book_title: "",
  author: "",
  description: "",
  condition: "",

  rentalPrice: 0,
  status: "",
  quantity: 0,
  approvedBooks: [],
  requestedBooks: [],
  ownerBooks: [],
  bookCopy: {
    quantity: 0,
  },
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getBookSuccess(state, action: PayloadAction<Book>) {
      state.loading = false;
      state.error = null;
      state.book = action.payload;
    },
    getBookCopySuccess(state, action: PayloadAction<Book>) {
      state.loading = false;
      state.error = null;
      state.bookCopy = action.payload;
    },
    addBookSuccess(state, action: PayloadAction<Book>) {
      state.loading = false;
      state.error = null;
      state.ownerBooks = [...state.ownerBooks, action.payload];
    },

    updateBookSuccess(state, action: PayloadAction<BookCopy>) {
      state.loading = false;
      state.error = null;

      const index = state.ownerBooks.findIndex(
        (b: BookCopy) => b.id === action.payload.id
      );

      if (index !== -1) {
        state.ownerBooks[index] = action.payload;
      } else {
        state.ownerBooks.push(action.payload);
      }

      state.bookCopy = action.payload;
    },
    updateBookAvailability(state, action: PayloadAction<string>) {
      if (state.bookCopy) {
        state.bookCopy.availability = action.payload;
      }
    },
    updateBookQuantity(state, action: PayloadAction<number>) {
      if (state.bookCopy) {
        state.bookCopy.quantity = action.payload;
      }
    },
    updateRentAmount(state, action: PayloadAction<number>) {
      if (state.bookCopy) {
        state.bookCopy.rentalPrice = action.payload;
      }
    },
    getBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.loading = false;
      state.error = null;
      state.books = action.payload;
    },
    getOwnerBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.loading = false;
      state.error = null;
      state.ownerBooks = action.payload;
    },
    getApprovedBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.loading = false;
      state.error = null;
      state.approvedBooks = action.payload;
    },
    getRequestedBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.loading = false;
      state.error = null;
      state.requestedBooks = action.payload;
    },
    removeBookSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.error = null;
      // Filter out the deleted book and assign the new array to state.ownerBooks
      state.ownerBooks = state.ownerBooks.filter(
        (book) => book.id !== action.payload
      );
    },
    updateBookStatusSuccess(state, action: PayloadAction<{ id: number }>) {
      state.loading = false;
      state.error = null;
      const { id } = action.payload;
      const book = state.requestedBooks.find((b: BookCopy) => b?.id === id);
      console.log({ book });
      if (book) {
        state.requestedBooks = state.requestedBooks.filter(
          (book: BookCopy) => book.id !== action.payload.id
        );
      }
    },
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setBookTitle(state, action: PayloadAction<string>) {
      state.book_title = action.payload;
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setCondition(state, action: PayloadAction<string>) {
      state.condition = action.payload;
    },
    setRentAmount(state, action: PayloadAction<number>) {
      state.rentalPrice = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setBookAvailability(state, action: PayloadAction<string>) {
      state.availability = action.payload;
    },
    clearBookFields(state) {
      state.availability = "";
      state.book_title = "";
      state.rentalPrice = 0;
      state.condition = "";
      state.categoryId = 0;
      state.author = "";
      state.description = "";
      state.quantity = 0;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});
export default bookSlice.reducer;

export const {
  getBookSuccess,
  addBookSuccess,
  updateBookSuccess,
  getBooksSuccess,
  getBookCopySuccess,
  updateBookAvailability,
  getOwnerBooksSuccess,
  getApprovedBooksSuccess,
  requestFailure,
  requestStart,
  setRentAmount,
  setLoading,
  setCategoryId,
  setBookAvailability,
  setBookTitle,
  setAuthor,
  setQuantity,
  setDescription,
  setCondition,
  getRequestedBooksSuccess,
  updateBookStatusSuccess,
  updateBookQuantity,
  clearBookFields,
  updateRentAmount,
  removeBookSuccess,
} = bookSlice.actions;
