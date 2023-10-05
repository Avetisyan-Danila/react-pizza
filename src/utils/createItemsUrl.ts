import { OrderEnum, SortPropertyEnum } from "../redux/slices/filterSlice";

export default function createItemsUrl(
  categoryId: number,
  searchValue: string,
  sortBy: SortPropertyEnum,
  orderBy: OrderEnum,
  currentPage: number
) {
  const url = new URL("https://64e6699c09e64530d17ff99d.mockapi.io/items");
  if (categoryId > 0) url.searchParams.append("category", `${categoryId}`);
  if (searchValue) url.searchParams.append("search", `${searchValue}`);
  url.searchParams.append("sortBy", `${sortBy}`);
  url.searchParams.append("order", `${orderBy}`);
  url.searchParams.append("page", `${currentPage}`);
  url.searchParams.append("limit", "8");

  return url.href;
}
