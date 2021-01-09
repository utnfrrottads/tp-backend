import { SearchQueryDTO } from "../entities/dto/SearchQueryDTO";

// Gets original object of type T out of a SearchQueryDTO
export default function fromSearchQueryDTO<T>(query: SearchQueryDTO<T>): T {
  const unsafeQuery = query as any;
  const { limit, skip, same, ...obj } = unsafeQuery;
  return obj;
}
