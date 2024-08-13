import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateType } from "../../types/authTypes";
import { User } from "../../types/userTypes";
const initialState: AuthStateType = {
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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setConfPassword(state, action: PayloadAction<string>) {
      state.confPassword = action.payload;
    },

    logoutSucces(state) {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});
export default authSlice.reducer;

export const {
  requestFailure,
  requestStart,
  setEmail,
  setPassword,
  setLoading,
  setConfPassword,
  setFirstName,
  setLastName,
  setLocation,
  setPhoneNumber,
  getUserSuccess,
  logoutSucces,
} = authSlice.actions;
