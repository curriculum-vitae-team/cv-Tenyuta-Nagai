import dayjs from 'dayjs';
import { IUser } from '../../../../interfaces/IUser.interface';

export const getUsersRegistrationDates = (data: IUser[]) => {
  const lastYear = +new Date() - 31536000000;
  const months: string[] = [];
  data?.map((item: IUser) => {
    if (+item.created_at < lastYear) {
      return;
    }
    months.push(dayjs(item.created_at).format('MMMM'));
  });
  return months;
};
