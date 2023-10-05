import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPizzaArgs, PizzaItem, PizzasSliceState, Status } from "./types";
import createItemsUrl from "../../../utils/createItemsUrl";

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaArgs>(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { categoryId, searchQuery, sortBy, orderBy, currentPage } = params;
    const url = createItemsUrl(
      categoryId,
      searchQuery,
      sortBy,
      orderBy,
      currentPage
    );
    const { data } = await axios.get<PizzaItem[]>(url);

    return data;
  }
);

const initialState: PizzasSliceState = {
  items: [],
  status: Status.IDLE,
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state: PizzasSliceState) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state: PizzasSliceState) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
