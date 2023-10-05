import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, OrderEnum, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING,
  },
  orderBy: OrderEnum.DESC,
  searchQuery: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setOrderBy(state, action: PayloadAction<OrderEnum>) {
      state.orderBy = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setOrderBy,
  setCurrentPage,
  setFilters,
  setSearchQuery,
} = filterSlice.actions;

export default filterSlice.reducer;
