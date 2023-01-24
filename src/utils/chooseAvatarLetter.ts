import { IUser } from '../interfaces/IUser.interface';

export const chooseAvatarLetter = (data: IUser | undefined) => {
  if (!data) {
    throw new Error('User data is wrong in chooseAvatarLetter');
  }
  if (data.profile?.first_name) {
    return data?.profile?.first_name[0].toUpperCase();
  }
  return data.email[0].toUpperCase();
};
