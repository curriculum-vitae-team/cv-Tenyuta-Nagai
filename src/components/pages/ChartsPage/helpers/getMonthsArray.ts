import dayjs from 'dayjs';

export const getArrayOfCurrentMonths = () => {
  const nextMonth = new Date().getMonth() + 1;
  const dateArray = [];
  for (let i = 0; i < 12; i++) {
    const num = (nextMonth + i) % 12;
    dateArray.push(num);
  }
  return dateArray.map((element) => dayjs((element + 1).toString()).format('MMMM'));
};
