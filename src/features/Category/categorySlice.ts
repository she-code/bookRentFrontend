import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryStateType } from "../../types/categoryTypes";
const initialState: CategoryStateType = {
  category: {
    category_name: "",
    createdAt: "",
  },
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategorySuccess(state, action: PayloadAction<Category>) {
      state.loading = false;
      state.error = null;
      state.category = action.payload;
    },
    getCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});
export default categorySlice.reducer;

export const {
  getCategorySuccess,
  requestFailure,
  requestStart,
  getCategoriesSuccess,
} = categorySlice.actions;
