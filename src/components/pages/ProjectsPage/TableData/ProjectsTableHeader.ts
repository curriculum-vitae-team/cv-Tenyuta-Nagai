import { IColumn } from '../../../Table/template/templateTable.types';

export const ProjectsTableHeader: IColumn[] = [
  { columnKey: 'name', columnName: 'Project name', isSortable: true },
  {
    columnKey: 'internalName',
    columnName: 'Internal name',
    isSortable: true,
  },
  {
    columnKey: 'domain',
    columnName: 'Domain',
    isSortable: true,
  },
  { columnKey: 'startDate', columnName: 'Start date', isSortable: true },
  {
    columnKey: 'endDate',
    columnName: 'End date',
    isSortable: true,
  },
];
