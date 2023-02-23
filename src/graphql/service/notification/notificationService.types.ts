import { ReactiveVar } from '@apollo/client';
import { AlertValues } from '../../../constants/alert';

export interface IAlert {
  type: AlertValues.SUCCESS | AlertValues.ERROR;
  message: string;
  id: number;
}

export interface INotification {
  alertArray$: ReactiveVar<IAlert[]>;
  alertId: number;
  openErrorAlert(message?: string): void;
  closeAlert(id: number): void;
}
