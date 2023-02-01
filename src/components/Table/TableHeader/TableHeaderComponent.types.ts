import { Directions } from '../../../constants/sortingDirections';
import { IColumn } from '../../pages/EmployeesPage/TableData/TableData.interface';

export type TableHeaderComponentProps = {
  columns: IColumn[];
  sortingBy: string;
  handleSetSortingDirection: (columnName: string) => void;
  direction: Directions;
};
