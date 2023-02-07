import { useReactiveVar } from '@apollo/client';
import { modalService } from '../../graphql/service/modalService';

export const useModal = () => {
  const ModalComponent = useReactiveVar(modalService.ModalComponent$);
  const open = useReactiveVar(modalService.open$);
  const modalProps = useReactiveVar(modalService.modalProps$);

  return {
    ModalComponent,
    open,
    modalProps,
  };
};
