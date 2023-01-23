export type TableHeaderCellProps = {
  name: string;
  active: boolean;
  handleSetSortingDirection: (columnName: string) => void;
  sortingIsAsc: boolean;
  isSortable: boolean;
  itemName: string;
};
