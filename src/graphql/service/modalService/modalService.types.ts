import { ReactiveVar } from '@apollo/client';

export interface IModalService {
  open$: ReactiveVar<boolean>;
  modalProps$: ReactiveVar<{ [key: string]: unknown } | null>;
  ModalComponent$: ReactiveVar<React.FC>;
  openModal: () => void;
  closeModal: () => void;
  setProps: (props: Record<string, unknown>) => void;
  setComponent: (component: React.FC) => void;
}
