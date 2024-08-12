import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserStateType } from "../../types/userTypes";
const initialState: UserStateType = {
  loading: false,
  error: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    password: "",
  },
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  confPassword: "",
  location: "",
  phoneNumber: "",
  owners: [],
  users: [],
  ownerRequests: [],
  customers: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    getCustomersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.error = null;
      state.customers = action.payload;
    },
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateOwnerStatusSuccess(
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) {
      state.loading = false;
      state.error = null;
      const { id, status } = action.payload;
      const user = state.ownerRequests.find((o) => o.id === id);
      if (user) {
        user.status = status;
        state.ownerRequests = state.ownerRequests.filter(
          (book) => book.id !== action.payload.id
        );
      }
    },
    getOwnerRequestsSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.error = null;
      state.ownerRequests = action.payload;
    },
    getOwnersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.error = null;
      state.owners = action.payload;
    },
    addOwner(state, action: PayloadAction<User>) {
      state.owners.push(action.payload);
    },
  },
});
export default userSlice.reducer;

export const {
  getUserSuccess,
  requestFailure,
  requestStart,
  getOwnerRequestsSuccess,
  getOwnersSuccess,
  updateOwnerStatusSuccess,
  addOwner,
  getCustomersSuccess,
} = userSlice.actions;
