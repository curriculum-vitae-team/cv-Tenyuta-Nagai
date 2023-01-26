import { IProfileModalProps } from '../../../pages/EmployeesProfilePage/ProfileModal/ProfileModal.types';

export type TableRowProps = {
  children: React.ReactNode;
  handleDelete: (id: string) => void;
  id: string;
  TableUpdateModal: React.FC<IProfileModalProps>;
};
