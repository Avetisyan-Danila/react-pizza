import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selectPizzas = (state: RootState) => state.pizzas;
export const pizzasSelector = createSelector([selectPizzas], (pizzas) => {
  return {
    items: pizzas.items,
    status: pizzas.status,
  };
});
