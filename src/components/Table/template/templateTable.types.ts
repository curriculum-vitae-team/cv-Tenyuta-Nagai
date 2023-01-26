import { IProfileModalProps } from '../../../pages/EmployeesProfilePage/ProfileModal/ProfileModal.types';
import { IColumn } from './../../../pages/EmployeesPage/TableData/TableData.interface';

export type TableProps<T = Item> = {
  header: IColumn[];
  items: T[];
  handleDelete: (id: string) => void;
  searchParameter: string;
  textAddBtn: string;
  TableUpdateModal: React.FC<IProfileModalProps>;
};

export type Item = Record<string, string>;

export type Element = {
  id: string;
};
