import { Directions } from '../../../constants/sortingDirections';
import { IColumn } from '../template/templateTable.types';

export type TableHeaderComponentProps = {
  columns: IColumn[];
  sortingBy: string;
  handleSetSortingDirection: (columnName: string) => void;
  direction: Directions;
};
