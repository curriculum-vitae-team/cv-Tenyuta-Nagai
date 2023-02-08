import { makeVar } from '@apollo/client';
import { DefaultComponent } from './helpers/DefaultComponent';
import { IModalService } from './modalService.types';

class ModalService implements IModalService {
  open$ = makeVar(false);
  modalData$ = makeVar<{ [key: string]: unknown }>({});
  title$ = makeVar('');
  component: React.FC = DefaultComponent;
  additionalData$ = makeVar<{ [key: string]: unknown } | null>(null);

  setAdditionalData(data: { [key: string]: unknown } | null) {
    this.additionalData$(data);
  }

  openModal() {
    this.open$(true);
  }

  closeModal() {
    this.open$(false);
  }

  setData(data: { [key: string]: unknown }) {
    this.modalData$(data);
  }

  setComponent(component: React.FC) {
    this.component = component;
  }

  setTitle(value: string) {
    this.title$(value);
  }

  setModalData(title: string, component: React.FC, data?: { [key: string]: unknown }) {
    data && this.setData(data);
    modalService.setTitle(title);
    modalService.setComponent(component);
    modalService.openModal();
  }
}

export const modalService = new ModalService();
