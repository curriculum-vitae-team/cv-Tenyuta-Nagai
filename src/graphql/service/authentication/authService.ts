import { makeVar, ReactiveVar } from '@apollo/client';
import { IUser } from '../../../interfaces/IUser.interface';

interface IAuthService {
  user$: ReactiveVar<IUser | null>;
  access_token$: ReactiveVar<string>;
  writeUserToStorage: (user: IUser, access_token: string) => void;
  clearStorage: () => void;
}

class AuthService implements IAuthService {
  user$ = makeVar<IUser | null>(null);
  access_token$ = makeVar('');

  constructor(private storage: Storage) {
    this.getUserFromStorage();
  }

  private getUserFromStorage() {
    const user = this.storage.getItem('user');
    const access_token = this.storage.getItem('access_token');
    if (user && access_token) {
      this.user$(JSON.parse(user));
      this.access_token$(access_token);
    }
  }

  writeUserFullName(fullName: string | undefined) {
    const user = this.user$();
    if (user) {
      const newUserData = { ...user, profile: { ...user.profile, full_name: fullName } };
      this.user$(newUserData);
      this.storage.setItem('user', JSON.stringify(newUserData));
    }
  }

  writeUserToStorage(user: IUser, access_token: string) {
    this.user$(user);
    this.access_token$(access_token);
    this.storage.setItem('user', JSON.stringify(user));
    this.storage.setItem('access_token', access_token);
  }

  clearStorage() {
    this.user$(null);
    this.access_token$('');
    this.storage.removeItem('user');
    this.storage.removeItem('access_token');
  }
}

export const authService = new AuthService(localStorage);
