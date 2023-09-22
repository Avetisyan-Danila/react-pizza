import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const calculateTotalPriceAndCount = (items) => {
  const totalPrice = items.reduce(
    (acc, pizza) => pizza.price * pizza.count + acc,
    0
  );
  const totalCount = items.reduce((acc, pizza) => acc + pizza.count, 0);
  return { totalPrice, totalCount };
};

const findPizzaIndex = (items, payload) =>
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
    addPizza(state, action) {
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
    removePizza(state, action) {
      const pizzaIndex = findPizzaIndex(state.items, action.payload);
      state.items.splice(pizzaIndex, 1);

      const { totalPrice, totalCount } = calculateTotalPriceAndCount(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    increasePizzas(state, action) {
      const pizzaIndex = findPizzaIndex(state.items, action.payload);
      state.items[pizzaIndex].count++;

      const { totalPrice, totalCount } = calculateTotalPriceAndCount(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
    },
    decreasePizzas(state, action) {
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

export const cartSelector = (state) => state.cart;

export const {
  addPizza,
  removePizza,
  clearPizzas,
  increasePizzas,
  decreasePizzas,
} = cartSlice.actions;

export default cartSlice.reducer;
