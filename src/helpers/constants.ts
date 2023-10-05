import { SortPropertyEnum } from "../redux/slices/filter/types";

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const sortItems: SortItem[] = [
  { name: "популярности", sortProperty: SortPropertyEnum.RATING },
  { name: "цене", sortProperty: SortPropertyEnum.PRICE },
  { name: "алфавиту", sortProperty: SortPropertyEnum.TITLE },
];
