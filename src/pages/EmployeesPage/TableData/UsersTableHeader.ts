import { TableCell } from '@mui/material';
import { FC, ReactNode } from 'react';
import { AvatarImage } from '../../../components/Table/helpers/Avatar/Avatar';
import { IAvatarImageProps } from '../../../components/Table/helpers/Avatar/Avatar.interface';

export interface IColumn {
  columnKey: string;
  columnName: string;
  isSortable: boolean;
  ColumnCellComponent: FC<ColumnCellComponentProps> | unknown;
}

export type ColumnCellComponentProps = {
  [key: string]: unknown;
};

export const UsersTableHeader: IColumn[] = [
  { columnKey: 'avatar', columnName: ' ', isSortable: false, ColumnCellComponent: AvatarImage },
  { columnKey: 'name', columnName: 'First Name', isSortable: true, ColumnCellComponent: TableCell },
  {
    columnKey: 'lastName',
    columnName: 'Last Name',
    isSortable: true,
    ColumnCellComponent: TableCell,
  },
  { columnKey: 'email', columnName: 'Email', isSortable: true, ColumnCellComponent: TableCell },
  {
    columnKey: 'department',
    columnName: 'Department',
    isSortable: true,
    ColumnCellComponent: TableCell,
  },
  {
    columnKey: 'position',
    columnName: 'Position',
    isSortable: true,
    ColumnCellComponent: TableCell,
  },
];
