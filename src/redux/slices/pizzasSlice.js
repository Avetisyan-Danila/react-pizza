import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createItemsUrl from "../../utils/createItemsUrl";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { categoryId, searchQuery, sort, currentPage } = params;
    const url = createItemsUrl(categoryId, searchQuery, sort, currentPage);
    const { data } = await axios.get(url);
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
