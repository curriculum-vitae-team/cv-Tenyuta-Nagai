export const getMonthsQuantity = function(arr1: string[], arr2: string[]) {
  const counts: { [key: string]: number } = {};
  arr1?.forEach((month) => {
    counts[month] = 0;
    arr2?.forEach((item) => {
      if (month === item) {
        counts[month]++;
      }
    });
  });
  return Object.values(counts);
};
