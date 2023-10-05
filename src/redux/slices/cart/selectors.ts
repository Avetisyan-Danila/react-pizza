import { RootState } from "../../store";
import { CartItem } from "./types";

export const cartSelector = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.filter((pizza: CartItem) => pizza.id === id);
