import { makeVar } from '@apollo/client';
import { DefaultComponent } from './helpers/DefaultComponent';
import { IModalService } from './modalService.types';

class ModalService implements IModalService {
  open$ = makeVar<boolean>(false);
  modalProps$ = makeVar<{ [key: string]: unknown } | null>(null);
  ModalComponent$ = makeVar<React.FC | React.FC<{ [key: string]: unknown }>>(DefaultComponent);

  openModal() {
    this.open$(true);
  }

  closeModal() {
    this.open$(false);
  }

  setProps(props: { [key: string]: unknown }) {
    this.modalProps$(props);
  }

  setComponent(component: React.FC | React.FC<{ [key: string]: unknown }>) {
    this.ModalComponent$(component);
  }
}

export const modalService = new ModalService();
