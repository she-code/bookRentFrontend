import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  //   getUserSuccess,
  //   logoutSucces,
  requestFailure,
  requestStart,
} from "./authSlice";
import { login, registerAsOwner } from "../../utils/apitUtils";
import { User } from "../../types/userTypes";
import { LoginPayload } from "../../types/authTypes";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (user: User, { dispatch }) => {
    try {
      dispatch(requestStart());
      const response = await registerAsOwner(user);

      return response;
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
      return { statusCode: 500, error: (error as string).toString() };
      // throw error; // Rethrow error to be caught in the component
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { dispatch }) => {
    try {
      dispatch(requestStart());
      const response = await login(payload.email, payload.password);

      return response;
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
      return { statusCode: 500, error: (error as string).toString() };
      // throw error; // Rethrow error to be caught in the component
    }
  }
);

// export const logoutUser = createAsyncThunk(
//   "users/logoutUser",
//   async (_, { dispatch }) => {
//     try {
//       // dispatch(requestStart());
//       // localStorage.removeItem("token");
//       // navigate("/login");
//       await logout();
//       dispatch(logoutSucces());
//       localStorage.removeItem("token");
//       navigate("/login");
//     } catch (error) {
//       dispatch(requestFailure((error as string).toString()));
//     }
//   }
// );
