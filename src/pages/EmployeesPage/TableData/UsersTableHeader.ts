import { AvatarImage } from '../../../components/Table/helpers/Avatar';
import { TableRowCell } from '../../../components/Table/TableRows/TableRowCell';
import { IColumn } from './TableData.interface';

export const UsersTableHeader: IColumn[] = [
  { columnKey: 'avatar', columnName: ' ', isSortable: false, ColumnCellComponent: AvatarImage },
  {
    columnKey: 'name',
    columnName: 'First Name',
    isSortable: true,
    ColumnCellComponent: TableRowCell,
  },
  {
    columnKey: 'lastName',
    columnName: 'Last Name',
    isSortable: true,
    ColumnCellComponent: TableRowCell,
  },
  { columnKey: 'email', columnName: 'Email', isSortable: true, ColumnCellComponent: TableRowCell },
  {
    columnKey: 'department',
    columnName: 'Department',
    isSortable: true,
    ColumnCellComponent: TableRowCell,
  },
  {
    columnKey: 'position',
    columnName: 'Position',
    isSortable: true,
    ColumnCellComponent: TableRowCell,
  },
];
