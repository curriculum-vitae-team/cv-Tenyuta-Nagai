import { makeVar } from '@apollo/client';
import { convertApolloError } from '../../utils/convertApolloError';
import { INotification } from './notificationService.types';

class Notification implements INotification {
  isOpen$ = makeVar<boolean>(false);
  type$ = makeVar<string>('');
  message$ = makeVar<string>('');

  openErrorAlert(errorMessage?: string) {
    if (errorMessage) {
      this.message$(convertApolloError(errorMessage));
    } else {
      this.message$('Error');
    }
    this.type$('error');
    this.isOpen$(true);
  }

  openSuccessAlert(message?: string) {
    if (message) {
      this.message$(message);
    } else {
      this.message$('Success');
    }
    this.type$('success');
    this.isOpen$(true);
  }

  closeAlert() {
    this.isOpen$(false);
  }
}

export const notificationService = new Notification();
