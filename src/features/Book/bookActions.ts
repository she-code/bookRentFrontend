import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getApprovedBooksSuccess,
  getBooksSuccess,
  getBookSuccess,
  getOwnerBooksSuccess,
  getRequestedBooksSuccess,
  requestFailure,
  requestStart,
  updateBookStatusSuccess,
} from "./bookSlice";
import { Book } from "../../types/bookTypes";
import {
  getAllBooks,
  getBook,
  getBookRequests,
  getOwnerBooks,
  getApprovedBooks as gp,
  updateBookApi,
  updateBookStatus,
} from "../../utils/apitUtils";
import { RegisterBookParams } from "../../types/sharedTypes";
import { API_ENDPOINT } from "../../config/constants";

export const getApprovedBooks = createAsyncThunk<
  Book[],
  void,
  { rejectValue: { statusCode: number; error: string } }
>("books/getApprovedBooks", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(requestStart());
    const response = await gp();
    dispatch(getApprovedBooksSuccess(response.data));
    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    dispatch(requestFailure(errorMessage));
    return rejectWithValue({ statusCode: 500, error: errorMessage });
  }
});

export const fetchBookRequests = createAsyncThunk(
  "books/fetchBookRequests",
  async (_, { dispatch }) => {
    try {
      dispatch(requestStart());
      const response = await getBookRequests();
      console.log({ response });
      dispatch(getRequestedBooksSuccess(response.data));
    } catch (error) {
      console.log({ error });
      dispatch(requestFailure((error as string).toString()));
    }
  }
);
interface UpdateBookStatusPayload {
  id: number;
  status: string;
}

// Create the async thunk for updating book status

export const updateBookStatusThunk = createAsyncThunk(
  "books/updateBookStatus",
  async (payload: UpdateBookStatusPayload, { dispatch }) => {
    try {
      dispatch(requestStart());

      const response = await updateBookStatus(payload.id, payload.status);
      console.log({ response });
      // Check the response status
      if (response.statusCode === 200) {
        // Adjust based on your API response
        // Dispatch success action
        dispatch(
          updateBookStatusSuccess({ id: payload.id, status: payload.status })
        );
      } else {
        // Handle specific response errors
        const errorMessage =
          response.data?.message || "Failed to update book status";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getAllBooks();
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getBooksSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch books";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (id: number, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getBook(id);
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getBookSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch books";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);

export const fetchOwnerBooks = createAsyncThunk(
  "books/fetchOwnerBooks",
  async (_, { dispatch }) => {
    dispatch(requestStart());

    try {
      const response = await getOwnerBooks();
      console.log({ response });
      if (response.statusCode === 200) {
        dispatch(getOwnerBooksSuccess(response.data));
      } else {
        // Handle specific response errors
        const errorMessage = response.message || "Unable to fetch books";
        dispatch(requestFailure(errorMessage));
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(requestFailure((error as Error).message));
    }
  }
);

interface UpdateBookParams {
  rent_amount: number;
  quantity: number;
  bookAvailability: string;
  id: number;
}
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (params: UpdateBookParams, { rejectWithValue }) => {
    try {
      const response = await updateBookApi(
        params.id,
        params.rent_amount,
        params.quantity,
        params.bookAvailability
      );

      if (response.statusCode === 200) {
        return response; // Return the data for successful cases
      } else {
        return rejectWithValue(response.message || "Unable to update book"); // Reject with an error message
      }
    } catch (error) {
      return rejectWithValue((error as Error).message); // Handle network errors
    }
  }
);

// export const registerBook = createAsyncThunk(
//   "books/registerBook",
//   async (book: RegisterBookParams, { rejectWithValue }) => {
//     try {
//       const response = await addBook(book);

//     if (response.statusCode === 200) {
//       return response; // Return the data for successful cases
//     } else {
//       return rejectWithValue(response.message || "Unable to add book"); // Reject with an error message
//     }
//   } catch (error) {
//     return rejectWithValue((error as Error).message); // Handle network errors
//   }
// }
// );

// export const registerBook = createAsyncThunk(
//   "books/registerBook",
//   async (params: RegisterBookParams, { rejectWithValue }) => {
//     const formData = new FormData();

//     formData.append("book_title", params.book_title);
//     formData.append("author", params.author);
//     formData.append("quantity", params.quantity.toString());
//     formData.append("bookAvailability", params.bookAvailability);
//     formData.append("rent_amount", params.rent_amount.toString());
//     formData.append("categoryId", params.categoryId.toString());
//     formData.append("image", params.image); // Appending the image file
//     formData.append("file", params.file); // Appending the PDF file
//     const API_BASE_URL = API_ENDPOINT;

//     try {
//       const response = await fetch(`${API_BASE_URL}books/addBook`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });
//       const data = await response.json();
//       if (data.statusCode === 201) {
//         return data; // Return the data for successful cases
//       } else {
//         return rejectWithValue(data.message || "Unable to add book"); // Reject with an error message
//       }
//     } catch (error) {
//       return rejectWithValue((error as Error).message); // Handle network errors
//     }
//   }
// );
export const registerBook = createAsyncThunk(
  "books/registerBook",
  async (params: RegisterBookParams) => {
    const formData = new FormData();

    formData.append("book_title", params.book_title);
    formData.append("author", params.author);
    formData.append("quantity", params.quantity.toString());
    formData.append("bookAvailability", params.bookAvailability);
    formData.append("description", params.description);

    formData.append("rent_amount", params.rent_amount.toString());
    formData.append("categoryId", params.categoryId.toString());
    formData.append("image", params.image);
    formData.append("file", params.file);

    const API_BASE_URL = API_ENDPOINT;

    try {
      const response = await fetch(`${API_BASE_URL}books/addBook`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        return data; // Return the data if the request is successful
      } else {
        return { error: data.message || "Unable to add book" }; // Return the error message
      }
    } catch (error) {
      return { error: (error as Error).message }; // Return the error message for network or other errors
    }
  }
);
