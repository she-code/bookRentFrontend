import { configureStore } from "@reduxjs/toolkit";
import auhtReducer from "../features/Auth/authSlice";
import bookReducer from "../features/Book/bookSlice";
import userReducer from "../features/User/userSlice";
import categoryReducer from "../features/Category/categorySlice";
export const store = configureStore({
  reducer: {
    auth: auhtReducer,
    books: bookReducer,
    users: userReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
