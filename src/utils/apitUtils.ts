import { API_ENDPOINT } from "../config/constants";
import { Book } from "../types/bookTypes";
import { RegisterBookParams } from "../types/sharedTypes";
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

  try {
    const response = await fetch(url, {
      method: method,
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
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
export const updateOwnertatus = (id: number, userStatus: string) => {
  return request(`users/updateOwnerStatus/${id}`, "PUT", { userStatus });
};

/*** BOOK APIS */

export const getBookRequests = () => {
  return request("books/getBookRequests", "GET", {});
};
export const getAllBooks = () => {
  return request("books/getAllBooks", "GET", {});
};

export const updateBookStatus = (id: number, bookStatus: string) => {
  return request(`books/updateBookStatus/${id}`, "PUT", { bookStatus });
};
export const updateBookApi = (
  id: number,
  rent_amount: number,
  quantity: number,
  bookAvailability: string
) => {
  return request(`books/${id}`, "PUT", {
    rent_amount,
    quantity,
    bookAvailability,
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

export const addBook = (book: RegisterBookParams) => {
  return request(`books/addBook`, "POST", { book });
};
/********* Categories API***/
export const getCategories = () => {
  return request("categories/getCategories", "GET", {});
};
