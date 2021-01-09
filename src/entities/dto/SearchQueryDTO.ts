export type SearchQueryDTO<T> = T & {
  limit: number;
  skip: number;
  same: {
    id: number;
    keys: (keyof T)[];
  };
};
