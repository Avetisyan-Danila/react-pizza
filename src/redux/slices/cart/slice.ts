import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLocalStorage } from "../../../utils/getCartFromLocalStorage";
import { CartItem, CartSliceState } from "./types";
import { calculateTotalPriceAndCount } from "../../../utils/calculateTotalPriceAndCount";

const { items, totalPrice, totalCount } = getCartFromLocalStorage();

const initialState: CartSliceState = {
  items: items,
  totalPrice: totalPrice,
  totalCount: totalCount,
};

const findPizzaIndex = (items: CartItem[], payload: CartItem) =>
  items.findIndex(
    (pizza) =>
      pizza.id === payload.id &&
      pizza.type === payload.type &&
      pizza.size === payload.size
  );

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<CartItem>) {
      const pizzaIndex = findPizzaIndex(state.items, action.payload);
      if (~pizzaIndex) {
        state.items[pizzaIndex].count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      const { totalPrice, totalCount } = calculateTotalPriceAndCount(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    removePizza(state, action: PayloadAction<CartItem>) {
      const pizzaIndex = findPizzaIndex(state.items, action.payload);
      state.items.splice(pizzaIndex, 1);

      const { totalPrice, totalCount } = calculateTotalPriceAndCount(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    increasePizzas(state, action: PayloadAction<CartItem>) {
      const pizzaIndex = findPizzaIndex(state.items, action.payload);
      state.items[pizzaIndex].count++;

      const { totalPrice, totalCount } = calculateTotalPriceAndCount(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    decreasePizzas(state, action: PayloadAction<CartItem>) {
      const pizzaIndex = findPizzaIndex(state.items, action.payload);
      state.items[pizzaIndex].count--;

      const { totalPrice, totalCount } = calculateTotalPriceAndCount(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    clearPizzas(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const {
  addPizza,
  removePizza,
  clearPizzas,
  increasePizzas,
  decreasePizzas,
} = cartSlice.actions;

export default cartSlice.reducer;
