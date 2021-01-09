export type SearchResultDTO<T> = {
  limit: number;
  skip?: number;
  total: number;
  items: T[];
};
