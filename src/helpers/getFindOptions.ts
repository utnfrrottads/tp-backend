import stripObject from "./getStrippedObject";

// Adapts to typeORM's find options format
export default function getFindOptions(
  where: any,
  limit?: number,
  skip?: number
) {
  const maxLimit = parseInt(process.env["MAX_SEARCH_LIMIT"]!) || 100;
  let finalLimit = maxLimit;
  if (limit && limit > 0 && limit < maxLimit) {
    finalLimit = limit;
  }
  where = stripObject(where);
  return {
    take: finalLimit,
    ...(skip && { skip }),
    where: where,
  };
}
