import { FC } from 'react';
import { ColumnCellComponentProps } from '../../../pages/EmployeesPage/TableData/UsersTableHeader';

export type TableHeader = {
  columnKey: string;
  columnName: string;
  isSortable: boolean;
  ColumnCellComponent: FC<ColumnCellComponentProps> | unknown;
}[];

export type TableProps<T = Item> = {
  header: TableHeader;
  items: T[];
};

export type Item = Record<string, string>;

export type Element = {
  id: string;
};
