// import { RootState } from "../../store";
// import { CartItem } from "./types";
//
// export const cartSelector = (state: RootState) => state.cart;
// export const selectCartItemById = (id: number) => (state: RootState) =>
//   state.cart.items.filter((pizza: CartItem) => pizza.id === id);

import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { CartItem } from "./types";

const selectCart = (state: RootState) => state.cart;
export const cartSelector = createSelector([selectCart], (cart) => {
  return {
    items: cart.items,
    totalPrice: cart.totalPrice,
    totalCount: cart.totalCount,
  };
});

const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemById = (id: number) =>
  createSelector([selectCartItems], (items) => {
    return items.filter((pizza: CartItem) => pizza.id === id);
  });
