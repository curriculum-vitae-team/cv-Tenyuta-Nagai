import { IColumn } from '../../EmployeesPage/TableData/TableData.interface';

export const cvsProjectsHeaderTable: IColumn[] = [
  {
    columnKey: 'projectName',
    columnName: 'Project name',
    isSortable: true,
  },
  {
    columnKey: 'internalName',
    columnName: 'Internal name',
    isSortable: false,
  },
  {
    columnKey: 'domain',
    columnName: 'Domain',
    isSortable: false,
  },
  {
    columnKey: 'startDate',
    columnName: 'Start date',
    isSortable: false,
  },
  {
    columnKey: 'endDate',
    columnName: 'End date',
    isSortable: false,
  },
];
