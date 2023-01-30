import { RoutePath } from '../../../constants/routeVariables';
import { IColumn } from './../../../pages/EmployeesPage/TableData/TableData.interface';

export type TableProps<T = Item> = {
  header: IColumn[];
  items: T[];
  handleDelete: (id: string) => void;
  searchParameter: string;
  ModalForCreating: React.FC<IModalForCreatingProps>;
  titleCreateBtn: string;
  buttonNavigateTitle: string;
  buttonNavigatePagePath: RoutePath;
  isCreateBtnVisible: boolean;
};

export type Item = Record<string, string | boolean | number>;

export type Element = {
  id: string;
};

export interface IModalForCreatingProps {
  open: boolean;
  onClose: () => void;
}
