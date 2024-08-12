import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../../utils/apitUtils";
import {
  getCategoriesSuccess,
  requestFailure,
  requestStart,
} from "./categorySlice";

export const fetchCategories = createAsyncThunk(
  "users/fetchCategories",
  async (_, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getCategories();
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getCategoriesSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch catagories";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);
