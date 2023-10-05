import { calculateTotalPriceAndCount } from "./calculateTotalPriceAndCount";

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const { totalPrice, totalCount } = calculateTotalPriceAndCount(items);

  return {
    items,
    totalPrice: totalPrice,
    totalCount: totalCount,
  };
};
