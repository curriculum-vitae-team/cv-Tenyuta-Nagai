import { Directions } from '../../../constants/sortingDirections';
import { TableHeader } from '../template/templateTable.types';

export type TableHeaderComponentProps = {
  columns: TableHeader;
  sortingBy: string;
  handleSetSortingDirection: (columnName: string) => void;
  direction: Directions;
};
