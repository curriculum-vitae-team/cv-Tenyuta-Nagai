import { ReactiveVar } from '@apollo/client';

export interface IModalService {
  open$: ReactiveVar<boolean>;
  modalData$: ReactiveVar<{ [key: string]: unknown }>;
  component: React.FC;
  title$: ReactiveVar<string>;
  additionalData$: ReactiveVar<{ [key: string]: unknown } | null>;
  openModal: () => void;
  closeModal: () => void;
  setData: (data: { [key: string]: unknown }) => void;
  setComponent: (component: React.FC) => void;
}
