import { IColumn } from '../../EmployeesPage/TableData/TableData.interface';

export const CvsTableHeader: IColumn[] = [
  {
    columnKey: 'template',
    columnName: 'Template',
    isSortable: false,
  },
  {
    columnKey: 'name',
    columnName: 'Name',
    isSortable: true,
  },
  {
    columnKey: 'description',
    columnName: 'Description',
    isSortable: false,
  },
  { columnKey: 'employee', columnName: 'Employee', isSortable: true },
];
