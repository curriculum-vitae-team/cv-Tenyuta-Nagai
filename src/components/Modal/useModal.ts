import { useReactiveVar } from '@apollo/client';
import { modalService } from '../../graphql/service/modalService';

export const useModal = () => {
  const Component = modalService.component;
  const open = useReactiveVar(modalService.open$);
  const title = useReactiveVar(modalService.title$);
  const onClose = modalService.closeModal;

  return {
    Component,
    open,
    title,
    onClose,
  };
};
