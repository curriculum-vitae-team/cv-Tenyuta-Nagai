import { IEmployeesModalProps } from '../../../pages/EmployeesPage/EmployeesModal/EmployeesModal.interface';
import { IAdditionalButtonsProps } from '../TableRows/TableRowComponent.types';
import { IColumn } from './../../../pages/EmployeesPage/TableData/TableData.interface';

export type TableProps<T = Item> = {
  header: IColumn[];
  items: T[];
  searchParameter: string;
  ModalForCreating: React.FC<IEmployeesModalProps>;
  titleCreateBtn: string;
  isCreateBtnVisible: boolean;
  AdditionalButtons: React.FC<IAdditionalButtonsProps>;
};

export type Item = Record<string, string>;

export type Element = {
  id: string;
};
