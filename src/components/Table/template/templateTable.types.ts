import { IAdditionalButtonsProps } from '../TableRows/TableRowComponent.types';
import { IColumn } from './../../../pages/EmployeesPage/TableData/TableData.interface';

export type TableProps<T = Item> = {
  header: IColumn[];
  items: T[];
  searchParameter: string;
  ModalForCreating: React.FC<IModalForCreatingProps>;
  titleCreateBtn: string;
  isCreateBtnVisible: boolean;
  AdditionalButtons: React.FC<IAdditionalButtonsProps>;
  defaultSortingBy: string;
};

export type Item = Record<string, string | number | boolean>;

export type Element = {
  id: string;
};

export interface IModalForCreatingProps {
  open: boolean;
  onClose: () => void;
}
