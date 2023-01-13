import { ReactiveVar } from '@apollo/client';

export interface INotification {
  isOpen$: ReactiveVar<boolean>;
  type$: ReactiveVar<string>;
  message$: ReactiveVar<string>;
  openErrorAlert(message?: string): void;
  openSuccessAlert(message?: string): void;
  closeAlert(): void;
}
