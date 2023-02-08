import { IColumn } from '../../../Table/template/templateTable.types';
import { DescriptionCvsTable } from '../CvsCustomTableCells/DescriptionCvsTable';
import { TemplateCvsTable } from '../CvsCustomTableCells/TemplateCvsTable';

export const CvsTableHeader: IColumn[] = [
  {
    columnKey: 'template',
    columnName: 'Template',
    isSortable: false,
    ColumnCellComponent: TemplateCvsTable,
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
    ColumnCellComponent: DescriptionCvsTable,
  },
  { columnKey: 'employee', columnName: 'Employee', isSortable: true },
  {
    columnKey: 'projects',
    columnName: 'Projects',
    isSortable: false,
  },
];
