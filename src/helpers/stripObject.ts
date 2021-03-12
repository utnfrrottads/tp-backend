// Removes undefined properties
export default function stripObject<T>(obj: T): Partial<T> {
  const newObj = { ...obj } as any;
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === void 0) delete newObj[key];
    if (newObj[key] instanceof Object && !Array.isArray(newObj[key])) {
      newObj[key] = stripObject(newObj[key]);
    }
  });
  return newObj;
}
