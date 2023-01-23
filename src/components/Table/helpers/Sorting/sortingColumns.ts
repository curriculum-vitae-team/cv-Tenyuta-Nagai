import { get, Path } from 'react-hook-form';

export const sortingColumns = <T>(orderBy: Path<T>, sortingIsAsc: boolean) => (a: T, b: T) => {
  const fieldA = get(a, orderBy);
  const fieldB = get(b, orderBy);
  if (!fieldA) {
    return 1;
  }
  if (!fieldB) {
    return -1;
  }
  if (sortingIsAsc) {
    return fieldA < fieldB ? 1 : -1;
  }
  return fieldA > fieldB ? 1 : -1;
};
