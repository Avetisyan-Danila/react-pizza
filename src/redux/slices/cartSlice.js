import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action) {
      const pizzaIndex = state.items.findIndex(
        (pizza) =>
          pizza.id === action.payload.id &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size
      );

      if (~pizzaIndex) {
        state.items[pizzaIndex].count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      // TODO: Мб можно вынести в общую функцию и переиспользовать тут и ниже
      state.totalPrice = state.items.reduce(
        (acc, pizza) => pizza.price * pizza.count + acc,
        0
      );

      state.totalCount = state.items.reduce(
        (acc, pizza) => acc + pizza.count,
        0
      );
    },
    removePizza(state, action) {
      const pizzaIndex = state.items.findIndex(
        (pizza) =>
          pizza.id === action.payload.id &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size
      );

      state.items.splice(pizzaIndex, 1);

      state.totalPrice = state.items.reduce(
        (acc, pizza) => pizza.price * pizza.count + acc,
        0
      );

      state.totalCount = state.items.reduce(
        (acc, pizza) => acc + pizza.count,
        0
      );
    },
    increasePizzas(state, action) {
      const pizzaIndex = state.items.findIndex(
        (pizza) =>
          pizza.id === action.payload.id &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size
      );

      state.items[pizzaIndex].count++;

      state.totalPrice = state.items.reduce(
        (acc, pizza) => pizza.price * pizza.count + acc,
        0
      );

      state.totalCount = state.items.reduce(
        (acc, pizza) => acc + pizza.count,
        0
      );
    },
    decreasePizzas(state, action) {
      const pizzaIndex = state.items.findIndex(
        (pizza) =>
          pizza.id === action.payload.id &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size
      );

      state.items[pizzaIndex].count--;

      state.totalPrice = state.items.reduce(
        (acc, pizza) => pizza.price * pizza.count + acc,
        0
      );

      state.totalCount = state.items.reduce(
        (acc, pizza) => acc + pizza.count,
        0
      );
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
