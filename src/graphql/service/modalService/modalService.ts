import { makeVar } from '@apollo/client';
import { DefaultComponent } from './helpers/DefaultComponent';
import { IModalService } from './modalService.types';

class ModalService implements IModalService {
  open$ = makeVar(false);
  modalData$ = makeVar<{ [key: string]: unknown }>({});
  title$ = makeVar('');
  component: React.FC = DefaultComponent;

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

  setModalData(title: string, data: { [key: string]: unknown }, component: React.FC) {
    modalService.setTitle(title);
    this.setData(data);
    modalService.setComponent(component);
    modalService.openModal();
  }
}

export const modalService = new ModalService();
