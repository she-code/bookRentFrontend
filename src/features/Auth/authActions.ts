import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserSuccess,
  logoutSucces,
  //   getUserSuccess,
  //   logoutSucces,
  requestFailure,
  requestStart,
} from "./authSlice";
import {
  getCurrentUser,
  login,
  logout,
  registerAsOwner,
} from "../../utils/apitUtils";
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

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (_, { dispatch }) => {
    try {
      dispatch(requestStart());
      await logout();
      dispatch(logoutSucces());
      localStorage.removeItem("token");
    } catch (error) {
      dispatch(requestFailure((error as string).toString()));
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getCurrentUser();
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getUserSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch user";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);
