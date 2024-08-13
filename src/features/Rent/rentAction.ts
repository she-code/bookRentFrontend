import { createAsyncThunk } from "@reduxjs/toolkit";
import { addRentAPI, getOwnerRents, getRents } from "../../utils/apitUtils";
import { AddRentParams } from "../../types/sharedTypes";
import {
  getOwnerRentsSuccess,
  getRentsSuccess,
  requestFailure,
  requestStart,
} from "./rentSlice";

export const addRent = createAsyncThunk(
  "books/addRent",
  async (rent: AddRentParams) => {
    try {
      const response = await addRentAPI(rent);

      if (response.statusCode === 200) {
        return response;
      } else {
        return { error: response.message || "Unable to add book" };
      }
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
);

export const fetchOwnerRents = createAsyncThunk(
  "rents/fetchOwnerRents",
  async (_, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getOwnerRents();
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getOwnerRentsSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch rents";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);

export const fetchRents = createAsyncThunk(
  "rents/fetchRents",
  async (_, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getRents();
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getRentsSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch rents";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);
