import dayjs from 'dayjs';
import { IUser } from '../../../../interfaces/IUser.interface';

export const getUsersRegistrationDates = (data: IUser[]) => {
  const lastYear = +new Date() - 31536000000;
  const months: string[] = [];
  let month: number;
  data?.map((item: IUser) => {
    if (+item.created_at < lastYear) {
      return;
    }
    month = new Date(+item.created_at).getMonth() + 1;
    months.push(dayjs(month.toString()).format('MMMM'));
  });
  return months;
};
