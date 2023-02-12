import { IColumn } from '../../../Table/template/templateTable.types';

export const LanguagesTableHeader: IColumn[] = [
  {
    columnKey: 'name',
    columnName: 'Language',
    isSortable: true,
  },
  {
    columnKey: 'iso2',
    columnName: 'ISO2',
    isSortable: true,
  },
];
