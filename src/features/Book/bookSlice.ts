import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BookStateType } from "../../types/bookTypes";

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
  rent_amount: 0,
  status: "",
  quantity: 0,
  approvedBooks: [],
  requestedBooks: [],
  ownerBooks: [],
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
    addBookSuccess(state, action: PayloadAction<Book>) {
      state.loading = false;
      state.error = null;
      state.ownerBooks = [...state.ownerBooks, action.payload];
    },

    updateBookSuccess(state, action: PayloadAction<Book>) {
      state.loading = false;
      state.error = null;

      const index = state.ownerBooks.findIndex(
        (b: Book) => b.id === action.payload.id
      );

      if (index !== -1) {
        state.ownerBooks[index] = action.payload;
      } else {
        state.ownerBooks.push(action.payload);
      }

      state.book = action.payload;
    },
    updateBookAvailability(state, action: PayloadAction<string>) {
      if (state.book) {
        state.book.bookAvailability = action.payload;
      }
    },
    updateBookQuantity(state, action: PayloadAction<number>) {
      if (state.book) {
        state.book.quantity = action.payload;
      }
    },
    updateRentAmount(state, action: PayloadAction<number>) {
      if (state.book) {
        state.book.rent_amount = action.payload;
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
    updateBookStatusSuccess(
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) {
      state.loading = false;
      state.error = null;
      const { id, status } = action.payload;
      const book = state.requestedBooks.find((b: Book) => b.id === id);
      console.log({ book });
      if (book) {
        book.status = status;
        state.requestedBooks = state.requestedBooks.filter(
          (book: Book) => book.id !== action.payload.id
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
    setRentAmount(state, action: PayloadAction<number>) {
      state.rent_amount = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setBookAvailability(state, action: PayloadAction<string>) {
      state.bookAvailability = action.payload;
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
  getRequestedBooksSuccess,
  updateBookStatusSuccess,
  updateBookQuantity,
  updateRentAmount,
} = bookSlice.actions;
