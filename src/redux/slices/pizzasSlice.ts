import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import createItemsUrl from "../../utils/createItemsUrl";
import { RootState } from "../store";
import { OrderEnum, SortPropertyEnum } from "./filterSlice";

type PizzaItem = {
  id: number;
  category: number;
  rating: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

export type FetchPizzaArgs = {
  categoryId: number;
  searchQuery: string;
  sortBy: SortPropertyEnum;
  orderBy: OrderEnum;
  currentPage: number;
};

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzasSliceState {
  items: PizzaItem[];
  status: Status;
}

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

export const pizzasSelector = (state: RootState) => state.pizzas;
export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
