import { Directions } from '../../../../constants/sortingDirections';

export type TableHeaderCellProps = {
  name: string;
  active: boolean;
  handleSetSortingDirection: (columnName: string) => void;
  isSortable: boolean;
  itemName: string;
  direction: Directions;
};
