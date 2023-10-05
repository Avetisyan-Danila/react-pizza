export enum SortPropertyEnum {
  RATING = "rating",
  TITLE = "title",
  PRICE = "price",
}

export enum OrderEnum {
  DESC = "desc",
  ASC = "asc",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sort: Sort;
  orderBy: OrderEnum;
  searchQuery: string;
}
