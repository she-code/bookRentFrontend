import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rent, RentStateType } from "../../types/rentType";

const initialState: RentStateType = {
  loading: false,
  rents: [],
  error: null,
  bookCopyId: 0,
  bookId: 0,
  ownerId: 0,
  quantity: 0,
  totalAmount: 0,
  rent: null,
  rentedBy: 0,
  ownerRents: [],
};

const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    getRentSuccess(state, action: PayloadAction<Rent>) {
      state.loading = false;
      state.error = null;
      state.rent = action.payload;
    },
    getRentsSuccess(state, action: PayloadAction<Rent[]>) {
      state.loading = false;
      state.error = null;
      state.rents = action.payload;
    },
    getOwnerRentsSuccess(state, action: PayloadAction<Rent[]>) {
      state.loading = false;
      state.error = null;
      state.ownerRents = action.payload;
    },
    addRentSuccess(state, action: PayloadAction<Rent>) {
      state.loading = false;
      state.error = null;
      state.rents.push(action.payload);
    },
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setBookId(state, action: PayloadAction<number>) {
      state.bookId = action.payload;
    },
    setBookCopyId(state, action: PayloadAction<number>) {
      state.bookCopyId = action.payload;
    },
    setTotalAmount(state, action: PayloadAction<number>) {
      state.totalAmount = action.payload;
    },
    setQuantity(state, action: PayloadAction<number>) {
      state.totalAmount = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});
export default rentSlice.reducer;

export const {
  requestFailure,
  requestStart,
  setBookCopyId,
  setBookId,
  setLoading,
  setQuantity,
  setTotalAmount,
  addRentSuccess,
  getOwnerRentsSuccess,
  getRentsSuccess,
  getRentSuccess,
} = rentSlice.actions;
