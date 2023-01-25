export const sortingColumns = <T>(orderBy: keyof T, sortingIsAsc: boolean) => (a: T, b: T) => {
  if (!a[orderBy]) {
    return 1;
  }
  if (!b[orderBy]) {
    return -1;
  }
  if (sortingIsAsc) {
    return a[orderBy] < b[orderBy] ? 1 : -1;
  }

  return b[orderBy] < a[orderBy] ? 1 : -1;
};
