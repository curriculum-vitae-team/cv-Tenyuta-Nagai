export const convertData = (data: string | undefined) => {
  if (!data) return '-';
  return new Date(+data).toDateString();
};
