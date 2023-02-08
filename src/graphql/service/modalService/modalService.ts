import { makeVar } from '@apollo/client';
import { DefaultComponent } from './helpers/DefaultComponent';
import { IModalService } from './modalService.types';

class ModalService implements IModalService {
  open$ = makeVar(false);
  modalData$ = makeVar<{ [key: string]: unknown }>({});
  title$ = makeVar('');
  component: React.FC = DefaultComponent;
  additionalData$ = makeVar<{ [key: string]: unknown } | null>(null);

  closeModal() {
    this.open$(false);
  }

  setModalData(title: string, component: React.FC, data?: { [key: string]: unknown }) {
    data && this.modalData$(data);
    this.title$(title);
    this.component = component;
    this.open$(true);
  }

  setAdditionalData(data: { [key: string]: unknown } | null) {
    this.additionalData$(data);
  }
}

export const modalService = new ModalService();
