// Removes undefined properties
export default function stripObject(obj: any) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === void 0) delete newObj[key];
  });
  return newObj;
}
