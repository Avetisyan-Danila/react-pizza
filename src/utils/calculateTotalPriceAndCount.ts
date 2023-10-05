import { CartItem } from "../redux/slices/cart/types";

export const calculateTotalPriceAndCount = (items: CartItem[]) => {
  const totalPrice = items.reduce(
    (acc, pizza) => pizza.price * pizza.count + acc,
    0
  );
  const totalCount = items.reduce((acc, pizza) => acc + pizza.count, 0);
  return { totalPrice, totalCount };
};
