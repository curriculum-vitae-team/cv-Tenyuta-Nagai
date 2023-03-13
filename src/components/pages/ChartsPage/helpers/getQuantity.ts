export const getDepartmentsQuantity = function(arr1: string[], arr2: string[]) {
  const counts: { [key: string]: number } = {};
  const filteredArray = arr2?.map((item) => (item === null ? 'Without department' : item));

  arr1?.forEach((department) => {
    counts[department] = 0;
    filteredArray?.forEach((item) => {
      if (department === item) {
        counts[department]++;
      }
    });
  });
  return Object.values(counts);
};
