import { OrderEnum, SortPropertyEnum } from "../filter/types";

export type PizzaItem = {
  id: number;
  category: number;
  rating: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

export type FetchPizzaArgs = {
  categoryId: number;
  searchQuery: string;
  sortBy: SortPropertyEnum;
  orderBy: OrderEnum;
  currentPage: number;
};

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzasSliceState {
  items: PizzaItem[];
  status: Status;
}
