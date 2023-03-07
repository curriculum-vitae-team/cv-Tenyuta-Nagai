import { makeVar } from '@apollo/client';
import { AlertDefaultMessage, AlertValues, ALERT_DURATION } from '../../../constants/alert';
import { convertApolloError } from '../../../utils/convertApolloError';
import { IAlert, INotification } from './notificationService.types';

class Notification implements INotification {
  alertArray$ = makeVar<IAlert[]>([]);
  alertId = 0;

  openErrorAlert(errorMessage?: string) {
    const alertData: IAlert = {
      id: ++this.alertId,
      message: convertApolloError(errorMessage || AlertDefaultMessage.ERROR),
      type: AlertValues.ERROR,
    };
    const alertArray = this.alertArray$();
    this.alertArray$([...alertArray, alertData]);
    this.autoCloseAlert(alertData.id);
  }

  autoCloseAlert(id: number) {
    setTimeout(() => this.closeAlert(id), ALERT_DURATION);
  }

  closeAlert(id: number) {
    const alertArray = this.alertArray$();
    this.alertArray$(alertArray.filter((alert) => alert.id !== id));
  }
}

export const notificationService = new Notification();
