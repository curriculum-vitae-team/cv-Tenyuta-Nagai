import { RoutePath } from '../../../constants/routeVariables';
import { IEmployeesModalProps } from '../../../pages/EmployeesPage/EmployeesModal/EmployeesModal.interface';
import { IColumn } from './../../../pages/EmployeesPage/TableData/TableData.interface';

export type TableProps<T = Item> = {
  header: IColumn[];
  items: T[];
  handleDelete: (id: string) => void;
  searchParameter: string;
  ModalForCreating: React.FC<IEmployeesModalProps>;
  titleCreateBtn: string;
  buttonNavigateTitle: string;
  buttonNavigatePagePath: RoutePath;
  isCreateBtnVisible: boolean;
};

export type Item = Record<string, string>;

export type Element = {
  id: string;
};
