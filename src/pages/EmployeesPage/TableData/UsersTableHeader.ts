import { AvatarImage } from '../../../components/Table/helpers/Avatar';
import { IColumn } from './TableData.interface';

export const UsersTableHeader: IColumn[] = [
  { columnKey: 'avatar', columnName: ' ', isSortable: false, ColumnCellComponent: AvatarImage },
  {
    columnKey: 'name',
    columnName: 'First Name',
    isSortable: true,
  },
  {
    columnKey: 'lastName',
    columnName: 'Last Name',
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
