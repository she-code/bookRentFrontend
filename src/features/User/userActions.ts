import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCustomersSuccess,
  getOwnerRequestsSuccess,
  getOwnersSuccess,
  getUserSuccess,
  requestFailure,
  requestStart,
  updateOwnerStatusSuccess,
} from "./userSlice";
import {
  getAllCustomers,
  getAllOwners,
  getCurrentUser,
  getOwnerRequests,
  updateOwnertatus,
} from "../../utils/apitUtils";

export const fetchOwnerRequests = createAsyncThunk(
  "users/fetchOwnerRequests",
  async (_, { dispatch }) => {
    try {
      dispatch(requestStart());
      const response = await getOwnerRequests();
      console.log({ response });
      dispatch(getOwnerRequestsSuccess(response.data));
    } catch (error) {
      console.log({ error });
      dispatch(requestFailure((error as string).toString()));
      //   return { statusCode: 500, error: (error as string).toString() };
    }
  }
);
interface UpdateOwnerStatusPayload {
  id: number;
  status: string;
}

export const updateOwnerStatusThunk = createAsyncThunk(
  "users/updateOwnerStatus",
  async (payload: UpdateOwnerStatusPayload, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await updateOwnertatus(payload.id, payload.status);
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(
          updateOwnerStatusSuccess({ id: payload.id, status: payload.status })
        );
      } else {
        // Handle specific response errors
        const errorMessage =
          response.data?.message || "Failed to update owner status";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);

export const fetchOwners = createAsyncThunk(
  "users/fetchOwners",
  async (_, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getAllOwners();
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getOwnersSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch owners";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);
export const fetchCustomers = createAsyncThunk(
  "users/fetchCustomers",
  async (_, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getAllCustomers();
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getCustomersSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch customers";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
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
