import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selectFilter = (state: RootState) => state.filter;
export const filterSelector = createSelector([selectFilter], (filter) => {
  return {
    categoryId: filter.categoryId,
    currentPage: filter.currentPage,
    sort: filter.sort,
    orderBy: filter.orderBy,
    searchQuery: filter.searchQuery,
  };
});
