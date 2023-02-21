import i18n from '../../../../localization/i18n';
import { AvatarImage } from '../../../Table/helpers/Avatar';
import { IColumn } from '../../../Table/template/templateTable.types';

export const UsersTableHeader: IColumn[] = [
  { columnKey: 'avatar', columnName: ' ', isSortable: false, ColumnCellComponent: AvatarImage },
  {
    columnKey: 'name',
    columnName: i18n.t('First Name'),
    isSortable: true,
  },
  {
    columnKey: 'lastName',
    columnName: i18n.t('Last Name'),
    isSortable: true,
  },
  { columnKey: 'email', columnName: i18n.t('Email'), isSortable: true },
  {
    columnKey: 'department',
    columnName: i18n.t('Department'),
    isSortable: true,
  },
  {
    columnKey: 'position',
    columnName: i18n.t('Position'),
    isSortable: true,
  },
];
