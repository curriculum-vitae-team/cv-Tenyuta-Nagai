export const formatDate = (date: string) => {
  if (!date) {
    return null;
  }
  return new Date(date)
    .toLocaleDateString('ru')
    .split('.')
    .reverse()
    .join('-');
};
