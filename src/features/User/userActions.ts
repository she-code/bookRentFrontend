import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCustomersSuccess,
  getOwnerRequestsSuccess,
  getOwnersSuccess,
  requestFailure,
  requestStart,
  updateOwnerApprovalSuccess,
  updateOwnerStatusSuccess,
} from "./userSlice";
import {
  getAllCustomers,
  getAllOwners,
  getOwnerRequests,
  updateOwnerApproval,
  updateOwnerStatus,
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
interface UpdateOwnerApprovalPayload {
  id: number;
  action: string;
}

export const updateOwnerApprovalThunk = createAsyncThunk(
  "users/updateOwnerApproval",
  async (payload: UpdateOwnerApprovalPayload, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await updateOwnerApproval(payload.id, payload.action);
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(
          updateOwnerApprovalSuccess({ id: payload.id, owner: response.data })
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

interface UpdateOwnerStatusPayload {
  id: number;
  isDisabled: boolean;
}

export const updateOwnerStatusThunk = createAsyncThunk(
  "users/updateOwnerStatus",
  async (payload: UpdateOwnerStatusPayload, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await updateOwnerStatus(payload.id, payload.isDisabled);
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(
          updateOwnerStatusSuccess({ id: payload.id, owner: response.data })
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
