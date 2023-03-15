export const getPositionsQuantity = function(arr1: string[], arr2: string[]) {
  const counts: { [key: string]: number } = {};
  const filteredArray = arr2?.map((item) => (item === null ? 'Without position' : item));

  arr1?.forEach((position) => {
    counts[position] = 0;
    filteredArray?.forEach((item) => {
      if (position === item) {
        counts[position]++;
      }
    });
  });
  return Object.values(counts);
};
