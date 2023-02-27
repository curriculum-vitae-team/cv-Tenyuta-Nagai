import { AvatarImage } from '../../../Table/helpers/Avatar';
import { IColumn } from '../../../Table/template/templateTable.types';

export const UsersTableHeader: IColumn[] = [
  { columnKey: 'avatar', columnName: ' ', isSortable: false, ColumnCellComponent: AvatarImage },
  {
    columnKey: 'name',
    columnName: 'First name',
    isSortable: true,
  },
  {
    columnKey: 'lastName',
    columnName: 'Last name',
    isSortable: true,
  },
  { columnKey: 'email', columnName: 'Email', isSortable: true },
  {
    columnKey: 'department',
    columnName: 'Department',
    isSortable: true,
  },
  {
    columnKey: 'position',
    columnName: 'Position',
    isSortable: true,
  },
];
