import { makeVar, ReactiveVar } from '@apollo/client';
import { StorageKeys } from '../../constants/storageKeys';
import { IUser } from '../../interfaces/IUser.interface';

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
    const user = this.storage.getItem(StorageKeys.User);
    const access_token = this.storage.getItem(StorageKeys.AccessToken);
    if (user && access_token) {
      this.user$(JSON.parse(user));
      this.access_token$(access_token);
    }
  }

  writeUserToStorage(user: IUser, access_token: string) {
    this.user$(user);
    this.access_token$(access_token);
    this.storage.setItem(StorageKeys.User, JSON.stringify(user));
    this.storage.setItem(StorageKeys.AccessToken, access_token);
  }

  clearStorage() {
    this.user$(null);
    this.access_token$('');
    this.storage.removeItem(StorageKeys.User);
    this.storage.removeItem(StorageKeys.AccessToken);
  }
}

export const authService = new AuthService(sessionStorage);
