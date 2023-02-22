import i18next from 'i18next';
import { AvatarImage } from '../../../Table/helpers/Avatar';
import { IColumn } from '../../../Table/template/templateTable.types';

export const UsersTableHeader: IColumn[] = [
  { columnKey: 'avatar', columnName: ' ', isSortable: false, ColumnCellComponent: AvatarImage },
  {
    columnKey: 'name',
    columnName: i18next.t('First Name'),
    isSortable: true,
  },
  {
    columnKey: 'lastName',
    columnName: i18next.t('Last Name'),
    isSortable: true,
  },
  { columnKey: 'email', columnName: i18next.t('Email'), isSortable: true },
  {
    columnKey: 'department',
    columnName: i18next.t('Department'),
    isSortable: true,
  },
  {
    columnKey: 'position',
    columnName: i18next.t('Position'),
    isSortable: true,
  },
];
