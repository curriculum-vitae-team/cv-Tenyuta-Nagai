import { ReactiveVar } from '@apollo/client';

export interface IModalService {
  open$: ReactiveVar<boolean>;
  modalData$: ReactiveVar<{ [key: string]: unknown }>;
  component: React.FC;
  title$: ReactiveVar<string>;
  additionalData$: ReactiveVar<{ [key: string]: unknown } | null>;
  closeModal: () => void;
  setModalData: (
    title: string,
    component: React.FC,
    data?:
      | {
          [key: string]: unknown;
        }
      | undefined
  ) => void;
  setAdditionalData: (
    data: {
      [key: string]: unknown;
    } | null
  ) => void;
}
