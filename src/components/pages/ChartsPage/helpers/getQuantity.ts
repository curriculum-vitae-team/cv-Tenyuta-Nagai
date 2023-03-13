export const getQuantity = function(arr1: string[], arr2: string[]) {
  const counts: { [key: string]: number } = {};
  arr1?.forEach((elem1) => {
    counts[elem1] = 0;
    arr2?.forEach((elem2) => {
      if (elem1 === elem2) {
        counts[elem1]++;
      }
    });
  });
  return Object.values(counts);
};
