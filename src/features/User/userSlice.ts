import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserStateType } from "../../types/userTypes";
const initialState: UserStateType = {
  loading: false,
  error: null,
  user: null,
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
    updateOwnerApprovalSuccess(
      state,
      action: PayloadAction<{ id: number; owner: User }>
    ) {
      state.loading = false;
      state.error = null;
      const { id, owner } = action.payload;
      const user = state.ownerRequests.find((o) => o.id === id);
      if (user) {
        user.status = owner.status;
        user.isApproved = owner.isApproved;
        user.userType = owner.userType;
        state.ownerRequests = state.ownerRequests.filter(
          (book) => book.id !== action.payload.id
        );
      }
    },

    updateOwnerStatusSuccess(
      state,
      action: PayloadAction<{ id: number; owner: User }>
    ) {
      state.loading = false;
      state.error = null;
      const { id, owner } = action.payload;

      // Find the index of the owner to be updated
      const ownerIndex = state.owners.findIndex((o) => o.id === id);

      // If the owner is found, update it
      if (ownerIndex !== -1) {
        state.owners[ownerIndex] = owner;
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
  requestFailure,
  requestStart,
  getOwnerRequestsSuccess,
  getOwnersSuccess,
  updateOwnerStatusSuccess,
  updateOwnerApprovalSuccess,
  addOwner,
  getCustomersSuccess,
} = userSlice.actions;
