import { API_ENDPOINT } from "../config/constants";
import { Book } from "../types/bookTypes";
import { Rent } from "../types/rentType";
import { AddRentParams, RegisterBookParams } from "../types/sharedTypes";
import { User } from "../types/userTypes";

const API_BASE_URL = API_ENDPOINT;
type RequestMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
// eslint-disable-next-line @typescript-eslint/ban-types
type RequestData =
  | { email: string; password: string }
  | { id: number }
  | User
  | Book
  | RegisterBookParams
  | Rent
  | AddRentParams
  // eslint-disable-next-line @typescript-eslint/ban-types
  | {};

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: RequestData = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map(
            (key) => `${key}=${(data as RequestData)[key as keyof RequestData]}`
          )
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }
  const token = localStorage.getItem("token");

  // Construct headers with the Authorization Bearer token if it exists
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      credentials: "include",

      body: method !== "GET" ? payload : null,
    });
    console.log({ response });
    if (response.ok) {
      const json = await response.json();

      console.log({ json });
      return {
        statusCode: response.status,
        ...json,
      };
    } else {
      const errorJson = await response.json();
      console.log({ errorJson });

      return {
        statusCode: response.status,
        ...errorJson,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
/**Auth */
export const login = (email: string, password: string) => {
  return request("auth/login", "POST", { email, password });
};

/*** Uer APIS */
export const registerAsOwner = (user: User) => {
  return request("auth/registerAsOwner", "POST", user);
};
export const registerUser = (user: User) => {
  return request("auth/register", "POST", user);
};
export const logout = () => {
  return request("auth/logout", "POST", {});
};
export const getAllOwners = () => {
  return request("users/getAllOwners", "GET", {});
};
export const getCurrentUser = () => {
  return request("users/currentUser", "GET", {});
};
export const getAllCustomers = () => {
  return request("users/getAllCustomers", "GET", {});
};
export const getOwnerRequests = () => {
  return request("users/getOwnerRequests", "GET", {});
};
export const updateOwnerApproval = (id: number, action: string) => {
  return request(`users/${id}/approval`, "PATCH", { action });
};
export const updateOwnerStatus = (id: number, isDisabled: boolean) => {
  return request(`users/updateOwnerStatus/${id}`, "PATCH", { isDisabled });
};

/*** BOOK APIS */

export const getBookRequests = () => {
  return request("books/getBookRequests", "GET", {});
};
export const getAllBooks = () => {
  return request("books/getAllBooks", "GET", {});
};

export const updateBookStatus = (id: number, action: string) => {
  return request(`books/updateBookStatus/${id}`, "PATCH", { action });
};
export const updateBookApi = (
  id: number,
  rentalPrice: number,
  quantity: number,
  availability: string
) => {
  return request(`books/${id}`, "PUT", {
    rentalPrice,
    quantity,
    availability,
  });
};
export const getApprovedBooks = () => {
  return request("books/getApprovedBooks", "GET", {});
};
export const getOwnerBooks = () => {
  return request("books/getOwnerBooks", "GET", {});
};
export const getBook = (id: number) => {
  return request(`books/${id}`, "GET", {});
};
export const getBookCopy = (id: number) => {
  return request(`books/bookCopies/${id}`, "GET", {});
};
export const getBookCopyEdit = (id: number) => {
  return request(`books/bookCopiesEdit/${id}`, "GET", {});
};
export const addBook = (book: RegisterBookParams) => {
  return request(`books/addBook`, "POST", { book });
};
export const deleteBookAPI = (id: number) => {
  return request(`books/${id}`, "DELETE", {});
};

/********* Categories API***/
export const getCategories = () => {
  return request("categories/getCategories", "GET", {});
};

/******** Rent */
export const addRentAPI = (rent: AddRentParams) => {
  return request(`rents/rentBook`, "POST", rent);
};

export const getOwnerRents = () => {
  return request("rents/getOwnerRents", "GET", {});
};

export const getRents = () => {
  return request("rents/getRents", "GET", {});
};
