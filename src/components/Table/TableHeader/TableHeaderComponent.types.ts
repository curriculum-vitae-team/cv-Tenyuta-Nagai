import { TableHeader } from '../template/templateTable.types';

export type TableHeaderComponentProps = {
  columns: TableHeader;
  sortingBy: string;
  handleSetSortingDirection: (columnName: string) => void;
  sortingIsAsc: boolean;
};
