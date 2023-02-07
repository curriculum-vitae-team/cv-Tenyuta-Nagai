import { Directions } from '../../../constants/sortingDirections';
import { IColumn } from '../../pages/EmployeesPage/TableData/TableData.interface';
import { IAdditionalButtonsProps } from '../TableRows/TableRowComponent.types';

export type TableHeaderComponentProps = {
  columns: IColumn[];
  sortingBy: string;
  handleSetSortingDirection: (columnName: string) => void;
  direction: Directions;
  AdditionalButtons?: React.FC<IAdditionalButtonsProps>;
};
