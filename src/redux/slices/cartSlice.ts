import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const calculateTotalPriceAndCount = (items: CartItem[]) => {
  const totalPrice = items.reduce(
    (acc, pizza) => pizza.price * pizza.count + acc,
    0
  );
  const totalCount = items.reduce((acc, pizza) => acc + pizza.count, 0);
  return { totalPrice, totalCount };
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

export const cartSelector = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.filter((pizza: CartItem) => pizza.id === id);

export const {
  addPizza,
  removePizza,
  clearPizzas,
  increasePizzas,
  decreasePizzas,
} = cartSlice.actions;

export default cartSlice.reducer;
